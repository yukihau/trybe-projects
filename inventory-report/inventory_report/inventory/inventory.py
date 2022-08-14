from .getter import Getter


class Inventory:
    @staticmethod
    def import_data(file_path, data_type):
        products = Getter.get_dict_by_file_type(file_path)
        report = Getter.get_report_by_data_type(products, data_type)
        return report
