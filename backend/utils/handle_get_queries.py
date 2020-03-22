from flask import abort
def get_entry_detail_level(request):
    """
    Returns wether the detail level of an entry should be short or full.
    """
    entry_level_detail  = request.args.get('personDetails', None)
    if entry_level_detail  not in ['short', 'full']:
        abort(400)
    return entry_level_detail 
