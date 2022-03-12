from django.contrib import admin
from base import models

admin.site.register(models.Congregation)
admin.site.register(models.Preacher)
admin.site.register(models.Series)
admin.site.register(models.Category)
@admin.register(models.Sermon)
class SermonAdmin(admin.ModelAdmin):
    list_display = ('date', 'congregation', 'theme', 'scripture', 'download_count')