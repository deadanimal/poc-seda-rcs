from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from project.models import (
    Project
)

from project.serializers import (
    ProjectSerializer
)


class ProjectViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'name',
        'start_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Project.objects.all()

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
        project = self.get_object()
        project.name = True
        project.save()

        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        project = self.get_object()
        project.start_date = True
        project.save()

        serializer = ProjectSerializer(project)
        return Response(serializer.data)
