import scrapy
from urllib.parse import urljoin
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class WebpriceSpider(scrapy.Spider):
    name = "webprice"
    allowed_domains = ["amazon.com"]
    tables = supabase.table('products').select('*').execute()
    asins = [(x['domain'], x['asin']) for x in list(tables)[0][1]]
    start_urls = [f'https://{x[0]}/dp/{x[1]}' for x in asins]

    def parse(self, response):
        print(response.url)
        print(response.status)
        
    def get_asins(self):
        response = supabase.table('products').select('*').execute()
        print(response)
        
    
