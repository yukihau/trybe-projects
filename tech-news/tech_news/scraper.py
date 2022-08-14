import requests
import time
from parsel import Selector
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    time.sleep(1)
    headers = {"user-agent": "Fake user-agent"}
    try:
        res = requests.get(url, headers, timeout=3)
        res.raise_for_status()
    except (requests.HTTPError, requests.Timeout):
        return None
    return res.text


# Requisito 2
def scrape_novidades(html_content):
    selector = Selector(html_content)
    links = selector.css(
        "div.post-archive article.entry-preview h2.entry-title a::attr(href)"
    ).getall()
    url_list = [link for link in links]
    return url_list


# Requisito 3
def scrape_next_page_link(html_content):
    selector = Selector(html_content)
    return selector.css(".navigation .nav-links a.next::attr(href)").get()


# Requisito 4
def get_timestamp(selector):
    time = selector.css('.post-meta .meta-date::text').get()
    return time


def get_comment_count(selector):
    comment_count = selector.css('.post-comments .title-block::text').get()
    if not comment_count:
        return 0
    return comment_count.split(" ")[0]


def get_summary(selector):
    summary = selector.css(".entry-content > p:nth-of-type(1) ::text").getall()
    return ''.join(summary).strip()


def get_title(selector):
    title = selector.css(".entry-header .entry-title::text").get()
    return title.strip()


def scrape_noticia(html_content):
    selector = Selector(html_content)
    return {
        "url": selector.css("link[rel='canonical']::attr(href)").get(),
        "title": get_title(selector),
        "timestamp": get_timestamp(selector),
        "writer": selector.css(".post-meta .author a::text").get(),
        "comments_count": get_comment_count(selector),
        "summary": get_summary(selector),
        "tags": selector.css(".post-tags ul li a::text").getall(),
        "category": selector.css(".category-style .label::text").get()
    }


# Requisito 5
def get_tech_news(amount):
    base_url = "https://blog.betrybe.com"
    index = 0
    tech_news = list()
    while index < amount:
        base_html = fetch(base_url)
        article_links = scrape_novidades(base_html)
        for url in article_links[0:amount-index]:
            article_html = fetch(url)
            article = scrape_noticia(article_html)
            tech_news.append(article)
            index += 1
        base_url = scrape_next_page_link(base_html)
    create_news(tech_news)
    return tech_news
