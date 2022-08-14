from src.jobs import read


def get_unique_job_types(path):
    jobs = read(path)
    unique_job_types = set(job["job_type"] for job in jobs)
    return list(unique_job_types)


def filter_by_job_type(jobs, job_type):
    return list(job for job in jobs if job["job_type"] == job_type)


def get_unique_industries(path):
    jobs = read(path)
    unique_industries = set(
        job["industry"] for job in jobs if job["industry"] != ""
    )
    return list(unique_industries)


def filter_by_industry(jobs, industry):
    return list(job for job in jobs if job["industry"] == industry)


def get_max_salary(path):
    jobs = read(path)
    max_salary = 0
    for job in jobs:
        if job["max_salary"].isnumeric():
            job_max_salary = int(job["max_salary"])
            job_salary_is_higher = job_max_salary > max_salary
            max_salary = job_max_salary if job_salary_is_higher else max_salary
    return max_salary


def get_min_salary(path):
    jobs = read(path)
    min_salary = 0
    for job in jobs:
        if job["min_salary"].isnumeric():
            if min_salary == 0:
                min_salary = int(job["min_salary"])
            else:
                job_min_salary = int(job["min_salary"])
                job_salary_is_lower = job_min_salary < min_salary
                if job_salary_is_lower:
                    min_salary = job_min_salary
    return min_salary


def matches_salary_range(job, salary):
    if (
        "min_salary" not in job
        or "max_salary" not in job
        or not str(job["min_salary"]).strip("-").isnumeric()
        or not str(job["max_salary"]).strip("-").isnumeric()
        or not job["min_salary"] < job["max_salary"]
        or not str(salary).strip("-").isnumeric()
    ):
        raise ValueError()

    is_in_range = salary >= job["min_salary"] and salary <= job["max_salary"]
    return is_in_range


def filter_by_salary_range(jobs, salary):
    filtered = list()
    for job in jobs:
        try:
            if matches_salary_range(job, salary):
                filtered.append(job)
        except ValueError:
            pass
    return filtered
