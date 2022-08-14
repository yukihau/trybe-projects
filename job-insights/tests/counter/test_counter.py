from src.counter import count_ocurrences


def test_counter():
    assert (
            count_ocurrences("src/jobs.csv", "marketing") == 1259
            and count_ocurrences("src/jobs.csv", "Marketing") == 1259
        )
