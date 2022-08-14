from collections import deque


class Queue:
    def __init__(self):
        self._data = deque()

    def __len__(self):
        return len(self._data)

    def enqueue(self, value):
        return self._data.append(value)

    def dequeue(self):
        return self._data.popleft()

    def search(self, index):
        if -1 <= index < 0:
            raise IndexError
        return self._data[index]
