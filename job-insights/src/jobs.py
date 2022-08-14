from functools import lru_cache
import csv


@lru_cache
def read(path):
    with open(path, encoding="utf-8") as file:
        path_reader = csv.DictReader(file, delimiter=",", quotechar='"')
        job_list = list(path_reader)
        return job_list
