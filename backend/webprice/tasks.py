from celery import shared_task
import time

@shared_task
def test():
    for i in range(100):
        print(i)
        time.sleep(2)