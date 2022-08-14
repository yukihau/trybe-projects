# caso base: []
# is_in_target_time = (
# 1 if permanence_period[0] <= target_time <= end_time else 0
# )
# return is_in_target_time + study_schedule([:1], target_time)


def study_schedule(permanence_period, target_time):
    if len(permanence_period) == 0:
        return 0

    try:
        start_time = permanence_period[0][0]
        end_time = permanence_period[0][1]
        is_in_target_time = 1 if start_time <= target_time <= end_time else 0
    except TypeError:
        return None

    new_period_list = permanence_period[1:]
    return is_in_target_time + study_schedule(new_period_list, target_time)
