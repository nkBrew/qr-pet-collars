from django.contrib import admin

from .models import Collar


class CollarAdmin(admin.ModelAdmin):
    pass


admin.site.register(Collar, CollarAdmin)
