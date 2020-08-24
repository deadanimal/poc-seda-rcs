from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from fail.models import (
    Fail
)

from fail.serializers import (
    FailSerializer
)


class FailViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Fail.objects.all()
    serializer_class = FailSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'name',
        'project_id'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Fail.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Fail.objects.all()
            else:
                queryset = Fail.objects.filter(company=company.id)
        """
        return queryset

    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        fail = self.get_object()
        fail.name = True
        fail.save()

        serializer = FailSerializer(fail)
        return Response(serializer.data)

    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        fail = self.get_object()
        fail.project_id = True
        fail.save()

        serializer = FailSerializer(fail)
        return Response(serializer.data)
