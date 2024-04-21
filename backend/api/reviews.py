import requests
from rich import print
from bs4 import BeautifulSoup
import re
from dotenv import load_dotenv
import os
import time
import csv
import random
from urllib.parse import urljoin

load_dotenv()
api = os.getenv('API_KEY')
session = requests.Session()

amazon_domains = [
    ('www.amazon.com', 'US'),
    ('www.amazon.co.uk', 'UK'),
    ('www.amazon.ca', 'CA'),
    ('www.amazon.de', 'DE'),
    ('www.amazon.fr', 'FR'),
    ('www.amazon.co.jp', 'JP'),
    ('www.amazon.in', 'IN'),
    ('www.amazon.com.au', 'AU'),
    ('www.amazon.cn', 'CN'),
    ('www.amazon.it', 'IT'),
    ('www.amazon.es', 'ES'),
    ('www.amazon.com.br', 'BR'),
    ('www.amazon.com.mx', 'MX')
]

headers = {
            'authority': 'www.amazon.com',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-gpc': '1',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'accept-language': 'en-US,en;q=0.9',
        }

def get_UA():
    UserAgents_csv = "userAgent.csv"
    path_csv = UserAgents_csv
    random_user_agent_list = []
    if os.path.exists(path_csv):
        with open(path_csv, 'r', encoding="utf-8") as csvfile:
            csv_reader = csv.reader(csvfile)
            random_user_agent_list = [
                item for row in csv_reader for item in row]
        ua = random.choice(random_user_agent_list)
    else:
        ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36'
    return ua

def get_domain(code):
    result = None
    for domain in amazon_domains:
        if code == domain[1]:
            result = domain[0]
    return result

def _request_via_api(url):
    payload = {'api_key': api, 'url': url}
    headers['referer'] = url
    headers['user-agent'] = get_UA()
    while True:
        response = requests.get('http://api.scraperapi.com',params=payload, headers=headers)
        # print(f'Url: {url}, {response.status_code}')
        if response.status_code == 200:
            break
        else:
            time.sleep(2)
    return response

def _requests(url, domain):
    global session
    headers['authority'] = domain
    headers['referer'] = url
    headers['user-agent'] = get_UA()
    response = requests.get(url, headers=headers)
    # print(f'Url: {url}, {response.status_code}')
    if check_title(response):
        return response
    else:
        return _request_via_api(url)

def _soup(response):
    return BeautifulSoup(response.text, 'html.parser')

def check_title(response):
    soup = _soup(response)
    title = soup.find(class_="product-title")
    if title:
        return True
    else:
        return False
    
def get_date(review_date, domain_code):
    date_path = r'(?= on )(.*)'
    on = 'on'
    if domain_code == 'IT':
        on = 'il'
        date_path = r'(?= il )(.*)'
    date = re.search(date_path, review_date).group(0).replace(on,'').strip()
    return date

def get_reviews(asin, domain_code='US',page=1):
    domain = get_domain(domain_code)
    if not domain:
        # print('Domain not in list')
        return None
    url = f'https://{domain}/product-reviews/{asin}?pageNumber={page}'
    response = _requests(url, domain)
    soup = _soup(response)
    title = soup.find(class_="product-title")
    if title:
        url = 'https://' + domain + title.a.get('href')
        # Remove ref and ie parameters
        clean_url = re.sub(r'(|&)ref=[^&]*', '', url)
        clean_url = re.sub(r'(\?|&)ie=[^&]*', '', clean_url)
        productUrl = clean_url
        title = title.a.get_text()
    review_section = soup.find(id='cm_cr-review_list')
    total_string = soup.find('div',{'data-hook':'cr-filter-info-review-rating-count'})
    
    total_reviews = None
    total_ratings = None
    total_page = 1
    if total_string:
        total_string = total_string.get_text(strip=True)
        pattern = r'(\d{1,3}(?:,\d{3})*)'
        found = re.findall(pattern, total_string)
        if found:
            try:
                total_ratings = int(found[0].replace(',',''))
            except:
                pass
            try:
                total_reviews = int(found[1].replace(',',''))
                total_page = int(total_reviews/10)
            except:
                pass
    nextPage = review_section.find(class_="a-last")
    review_divs = review_section.find_all(class_='review')
    summary_string = soup.select('.histogram .a-text-right')
    rating_5 = summary_string[0].get_text().strip()
    rating_4 = summary_string[1].get_text().strip()
    rating_3 = summary_string[2].get_text().strip()
    rating_2 = summary_string[3].get_text().strip()
    rating_1 = summary_string[4].get_text().strip()
    info = {
        'status': 'OK',
        'current_page': page,
        'total_page': total_page,
        'data': {
            'asin': asin,
            'title': title,
            'url': productUrl,
            'country': domain_code,
            'domain': domain,
            'total_ratings': total_ratings,
            'total_reviews': total_reviews,
            'rating_summary': {
                '5 stars': rating_5,
                '4 stars': rating_4,
                '3 stars': rating_3,
                '2 stars': rating_2,
                '1 star': rating_1,
            },
            'reviews': list()
        }
    }
    all_reviews = []
    for review_div in review_divs:
        author = review_div.find(class_="a-profile-name")
        if author:
            author = author.get_text()
        title = review_div.find(class_='review-title')
        link = None
        if title:
            try:
                link = domain + title.get('href')
            except:
                continue
            title = title.find_all('span')[-1].get_text().strip()
        rating = review_div.find(class_='review-rating')
        if rating:
            rating = rating.span.get_text()
            rating = rating.split(' ')[0]
        detail = review_div.find(class_="review-text")
        if detail:
            detail = detail.get_text().strip()
        date = review_div.find(class_='review-date')
        avatar = review_div.find(class_='a-profile-avatar')
        if avatar:
            avatar = avatar.img.get('src')
        verified_div = review_div.find('span',{'data-hook': 'avp-badge'})
        if verified_div:
            verified = True
        else:
            verified = False
        if date:
            date = get_date(date.get_text(), domain_code)
        helpful_string = review_div.find(class_='cr-vote-text')
        if helpful_string:
            helpful_string = helpful_string.get_text(strip=True)
        review_id = review_div.get('id')
        images = review_div.find_all(class_='review-image-tile')
        if len(images) > 0:
            images = [x.get('src') for x in images]
        review = {
            'review_id': review_id,
            'review_title': title,
            'review_date': date,
            'review_rating':rating,
            'review_details': detail,
            'review_author': author,
            # 'author_avatar': avatar,
            'verified_purchase': verified,
            'helpful_vote': helpful_string,
            'review_link': link,
            'review_images': images,
        }
        all_reviews.append(review)
    info['data']['reviews'] = all_reviews
    # print(info)
    return info

if __name__== "__main__":
    get_reviews('1546017453','US', 1)