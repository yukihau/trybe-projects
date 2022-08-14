from inventory_report.inventory.product import Product


test_product = {
    "id": 1,
    "nome_do_produto": 'Produto Teste',
    "nome_da_empresa": 'Empresa teste',
    "data_de_fabricacao": '7/11/2022',
    "data_de_validade": '8/11/2022',
    "numero_de_serie": '78129',
    "instrucoes_de_armazenamento": 'na caixa',
}


def test_cria_produto():
    product = Product(
        test_product['id'],
        test_product['nome_do_produto'],
        test_product['nome_da_empresa'],
        test_product['data_de_fabricacao'],
        test_product['data_de_validade'],
        test_product['numero_de_serie'],
        test_product['instrucoes_de_armazenamento']
    )
    assert product.id is test_product['id']
    assert product.nome_do_produto is test_product['nome_do_produto']
    assert product.nome_da_empresa is test_product['nome_da_empresa']
    assert product.data_de_fabricacao is test_product['data_de_fabricacao']
    assert product.data_de_validade is test_product['data_de_validade']
    assert product.numero_de_serie is test_product['numero_de_serie']
    assert (
        product.instrucoes_de_armazenamento
        is
        test_product['instrucoes_de_armazenamento']
    )
