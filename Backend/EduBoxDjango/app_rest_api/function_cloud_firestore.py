import firebase_admin
from firebase_admin import db, firestore
from firebase_admin import credentials

cred = credentials.Certificate('EduBoxDjango/app_rest_api/edubox-web-firebase-adminsdk-kqx28-0190a14c44.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def add_user(user_infor):
    doc_ref = db.collection(u'users').document()
    doc_ref.set(user_infor)

def add_course(add_course):
    doc_ref = db.collection(u'courses').document()
    doc_ref.set(add_course)
    print('Save course into db success')

def get_course_by_document_name(document_name):
    doc_ref = db.collection(u'courses').document(document_name)
    course_information = doc_ref.get()
    if course_information.exists:
            return course_information.to_dict()
    else:
        return {'Error':'Document name doesn\'t exist'}

def get_courses_by_user_id(user_id):
    course_ref = db.collection(u'courses')
    # query = course_ref.where(u'subject', u'==', u'Toan')
    query = course_ref.where(u'user.id', u'==', user_id)
    courses = query.get()
    data = []
    for course in courses:
        data.append(course.to_dict().copy())
    return data

def get_courses_by_course_id(course_id):
    course_ref = db.collection(u'courses')
    print(course_id)
    query = course_ref.where(u'unique_id', u'==', course_id)
    courses = query.get()
    data = []
    for course in courses:
        data.append(course.to_dict().copy())
    return data

def get_courses():
    courses = db.collection(u'courses').stream()
    data = []
    for course in courses:
        data.append(course.to_dict().copy())
    return data

# def set_data():
#     doc_ref = db.collection(u'users').document(u'alovelace')
#     doc_ref.set({
#         u'first': u'B',
#         u'last': u'B',
#         u'born': 0
#     })
#
# def read_data():
#     users_ref = db.collection(u'users')
#     docs = users_ref.stream()
#     content = ''
#
#     for doc in docs:
#         print(f' data from cloud firestore {doc.id} => { doc.to_dict()}')
#         content = content + f'with data from cloud firestore {doc.id} => { doc.to_dict()}'
#     return content
#
# def read_data_only():
#     doc_ref = db.collection(u'users').document(u'alovelace')
#     doc = doc_ref.get()
#     content = ' '
#     if doc.exists :
#         content = doc.get('first') + ' ' + doc.get('last')
#     return content
