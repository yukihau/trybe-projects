import sys
from ting_file_management.file_management import txt_importer


def search_queue(path_file, instance):
    for index in range(len(instance)):
        if instance.search(index)["nome_do_arquivo"] == path_file:
            return True
    return False


def process(path_file, instance):
    path_file_is_in_queue = search_queue(path_file, instance)
    if path_file_is_in_queue:
        return False

    text = txt_importer(path_file)
    new_queue = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(text),
        "linhas_do_arquivo": text
    }

    instance.enqueue(new_queue)
    print(new_queue, file=sys.stdout)


def remove(instance):
    queue_is_empty = len(instance) == 0
    if queue_is_empty:
        return print("Não há elementos", file=sys.stdout)
    path_file = instance.dequeue()["nome_do_arquivo"]
    return print(f"Arquivo {path_file} removido com sucesso", file=sys.stdout)


def file_metadata(instance, position):
    try:
        found = instance.search(position)
        return print(found, file=sys.stdout)
    except IndexError:
        return print("Posição inválida", file=sys.stderr)
