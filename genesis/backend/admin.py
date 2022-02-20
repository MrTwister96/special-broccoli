from django.contrib import admin
from backend.models import Prediker, Gemeente, Reeks, Preek

admin.site.register(Prediker)
admin.site.register(Gemeente)
admin.site.register(Reeks)
@admin.register(Preek)
class PreekAdmin(admin.ModelAdmin):
    list_display = ('datum', 'gemeente', 'prediker', 'tema', 'downloads')