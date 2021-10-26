from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import os
from dotenv import load_dotenv
import openai

load_dotenv()
openai.api_key = os.environ.get('OPENAI_KEY')
completion = openai.Completion()

chat_log = ''

start_chat_log = '''Human: Hello, who are you?
AI: I am doing great. How can I help you today?
'''


def ask(question, chat_log=None):
    if chat_log is None:
        chat_log = start_chat_log
    prompt = f'{chat_log}Human: {question}\nAI:'
    response = completion.create(
        prompt=prompt, engine="curie", stop=['\nHuman'], temperature=0.8,
        top_p=1, frequency_penalty=0.8, presence_penalty=0.5, best_of=2 )
    answer = response.choices[0].text.strip()
    return answer


def append_interaction_to_chat_log(question, answer, chat_log=None):
    if chat_log is None:
        chat_log = start_chat_log
    return f'{chat_log}Human: {question}\nAI: {answer}\n'


def index(request):
    return render(request, 'chat/index.html')


def send_message(request):
    if request.is_ajax() and request.method == 'POST':
        global chat_log

        response = ask(request.POST.get('message'), chat_log)
        chat_log += append_interaction_to_chat_log(request.POST.get('message'), response, chat_log)
        print(chat_log)

        return JsonResponse({'answer': response})
