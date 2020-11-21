from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import EduBoxDjango.app_rest_api.function_cloud_firestore as function_db
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.utils.crypto import get_random_string

class TestAPI(APIView):

    def get(self, request, format=None):
        content = function_db.read_data_only()
        return Response(status=status.HTTP_200_OK, data="Test Api Success with " + content)

# class UserAPI(APIView):
#     def add_user(self, request):

# python3 manage.py runserver localhost:8000

@api_view(['GET'])
def testAuthentication(request):
    # permission_classes = (IsAuthenticated,)
    data_test = {"message":"Authentication Success"}
    return JsonResponse(status=status.HTTP_200_OK, data=data_test)

@api_view(['POST'])
def add_user(request):
    permission_classes = (IsAuthenticated, )
    user_information = JSONParser().parse(request)
    function_db.add_user(user_information)
    return JsonResponse(status=status.HTTP_200_OK, data=user_information)

@api_view(['POST'])
def add_course(request):
    # permission_classes = (IsAuthenticated, )
    unique_id = get_random_string(length=32)
    course_information = JSONParser().parse(request)
    course_information["unique_id"] = unique_id
    print(course_information);
    function_db.add_course(course_information)
    return JsonResponse(status=status.HTTP_200_OK, data=course_information)

@api_view(['GET'])
def get_courses_by_course_id(request, course_id):
    # permission_classes = (IsAuthenticated,)
    print(course_id)
    reponse_data = function_db.get_courses_by_course_id(course_id=course_id)
    return JsonResponse(status=status.HTTP_200_OK, data=reponse_data, safe=False)

@api_view(['GET'])
def get_courses_by_user_id(request, user_id):
    # permission_classes = (IsAuthenticated,)
    reponse_data = function_db.get_courses_by_user_id(user_id=user_id)
    return JsonResponse(status=status.HTTP_200_OK, data=reponse_data, safe=False)



@api_view(['GET'])
def get_courses(request):
    permission_classes = (IsAuthenticated,)
    reponse_data = function_db.get_courses()
    return JsonResponse(status=status.HTTP_200_OK, data=reponse_data, safe=False)

@api_view(['POST'])
def tinh_tich(request):
    var_data = JSONParser().parse(request)
    print('Start get data')
    print(var_data)
    x = var_data['x']
    y = var_data['y']
    sum = x+y
    respone = {"x":x,"y":y,"sum":sum}
    return JsonResponse(status=status.HTTP_200_OK, data=respone)

# @api_view(['GET'])
# def get_course_by_document_name(request, document_name):
#     # permission_classes = (IsAuthenticated,)
#     reponse_data = function_db.get_course_by_document_name(document_name=document_name)
#     return JsonResponse(status=status.HTTP_200_OK, data=reponse_data)