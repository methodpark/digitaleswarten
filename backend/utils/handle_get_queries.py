from flask import abort
def get_entry_detail_level(request):
    """
    Returns whether the detail level of an entry should be short or full.
    """
    entry_level_detail = request.args.get('personDetails', None)
    if entry_level_detail  not in ['short', 'full']:
        abort(400)
    return entry_level_detail 


def get_entry_state_query(request):
    """
    Returns whether the entry state is requested or throws 400 otherwise.
    """
    state_queried = request.args.get('state', None)
    if state_queried is None:
        abort(400)
    return state_queried
