# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename


class Income(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ay_id = models.CharField(max_length=100, default='NA', blank=True)
    ay_id_app = models.CharField(max_length=100, default='NA', blank=True)
    ay_year_number = models.CharField(
        max_length=100, default='NA', blank=True)
    ay_year = models.CharField(
        max_length=100, default='NA', blank=True)
    ay_generate = models.CharField(max_length=100, default='NA', blank=True)
    ay_export = models.CharField(max_length=100, default='NA', blank=True)
    ay_daa = models.CharField(max_length=100, default='NA', blank=True)
    ay_total_days = models.CharField(max_length=100, default='NA', blank=True)
    ay_prorate = models.CharField(max_length=100, default='NA', blank=True)
    inf_cre_dt = models.CharField(max_length=100, default='NA', blank=True)
    inf_cre_usr = models.CharField(max_length=100, default='NA', blank=True)
    inf_mod_dt = models.CharField(max_length=100, default='NA', blank=True)
    inf_mod_usr = models.CharField(max_length=100, default='NA', blank=True)
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']

    def __str__(self):
        return self.name
