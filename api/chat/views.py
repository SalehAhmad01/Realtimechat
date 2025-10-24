# from django.shortcuts import render
# from rest_framework.views import APIView  # fixed: 'view' → 'views'
# from rest_framework import permissions
# from rest_framework.response import Response
# from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken  # fixed: 'RefrshToken' typo
# from .serializers import UserSerializer


# def get_auth_for_user(user):
#     token = RefreshToken.for_user(user)  # fixed: 'RefrshToken' → 'RefreshToken'
#     return {
#         'user': UserSerializer(user).data,
#     }


# class SignInView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         if not username or not password:
#             return Response(status=400)

#         user = authenticate(request, username=username, password=password)
#         if not user:
#             return Response(status=401)

#         return Response(user_data)


from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, SignUpSerializer


def get_auth_for_user(user):
    token = RefreshToken.for_user(user)
  
    return {
        'user': UserSerializer(user).data,
        'token':{
        'refresh': str(token),
        'access': str(token.access_token),
        }
        
    }


class SignInView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=400)

        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({'error': 'Invalid username or password'}, status=401)

        # ✅ Now generate token + user data
        user_data = get_auth_for_user(user)

        return Response(user_data, status=200)





class SignUpView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
       new_user = SignUpSerializer(data=request.data)
       new_user.is_valid(raise_exception=True)
       user = new_user.save()

       user_data = get_auth_for_user(user)

       return Response(user_data, )
     
