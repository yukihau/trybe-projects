from .reader import Reader
from ..reports.simple_report import SimpleReport
from ..reports.complete_report import CompleteReport


class Getter:
    @staticmethod
    def get_dict_by_file_type(file_path):
        products = list()
        if file_path.endswith('.csv'):
            products = Reader.read_csv(file_path)
        elif file_path.endswith('.json'):
            products = Reader.read_json(file_path)
        elif file_path.endswith('.xml'):
            products = Reader.read_xml(file_path)
        return products

    def get_report_by_data_type(products, data_type):
        report = list()
        if data_type == 'simples':
            report = SimpleReport.generate(products)
        elif data_type == 'completo':
            report = CompleteReport.generate(products)
        return report
