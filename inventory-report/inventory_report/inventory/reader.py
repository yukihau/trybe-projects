import csv
import json
import xmltodict


class Reader():
    @staticmethod
    def read_csv(file_path):
        with open(file_path, encoding='utf-8') as file:
            reader = csv.DictReader(file)
            return list(row for row in reader)

    def read_json(file_path):
        with open(file_path, encoding='utf-8') as file:
            reader = json.load(file)
            return list(row for row in reader)

    def read_xml(file_path):
        with open(file_path, encoding='utf-8') as file:
            reader = xmltodict.parse(file.read())['dataset']['record']
            return list(row for row in reader)
