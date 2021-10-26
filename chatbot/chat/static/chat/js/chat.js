$(document).ready(function() {
    const msgInput = document.querySelector('#msg-input');
    const sendBtn = document.querySelector('#send-btn');
    const chatBox = document.querySelector('.chats');


    function chat() {
        const msg = msgInput.value;

        if (!msg) return;

        msgInput.value = '';
        const csrf = document.querySelector('[name="csrfmiddlewaretoken"]').value;

        chatBox.innerHTML += '<div class="my-chat">' + msg + '</div>';


        $.ajaxSetup({
            header: {
                "X-Requested-With": 'XMLHttpRequest'
            }
        });

        $.ajax({
            url: 'send_message/',
            method: 'POST',
            dataType: 'json',
            data: {
                'csrfmiddlewaretoken': csrf,
                'message': msg
         },
            success: function(response) {
                chatBox.innerHTML += '<div class="client-chat">' + response.answer + '</div>';
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        })

    }


    msgInput.addEventListener('keydown', function(e) {
        if (e.key == 'Enter') {
            chat();
        }
    })

    sendBtn.addEventListener('click', function(){
        chat();
    })
})

const sendBtn = document.querySelector('#send-btn');
sendBtn.addEventListener('click', () => {
  var objDiv = document.querySelector(".chats");
  console.log(objDiv)
  objDiv.scrollTop = objDiv.scrollHeight;
})