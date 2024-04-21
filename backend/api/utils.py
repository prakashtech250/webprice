from bs4 import BeautifulSoup
import requests
import random
import csv
import re

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

def is_asin(asin):
    pattern = r'^[A-Za-z0-9]{10}$'
    return bool(re.match(pattern, asin))