from .report_getter import ReportGetter


class ReportFormatter:
    @staticmethod
    def get_company_product_amount_string_list(products):
        companies = ReportGetter.get_company_list(products)
        return list(
            f"- {company}: "
            f"{ReportGetter.get_company_product_count(products, company)}\n"
            for company in companies
        )
