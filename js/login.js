let $ = require("jquery");

const ipc = require("electron").ipcRenderer;
$("#btn_login").on("click", () => {
    $("#lbl").text("");
    var txtUser = $("#txtUsr").val();
    var txtPwd = $("#txtPwd").val();

    if (txtUser != "" && txtPwd != "") {
        $(".ajax_loder").show();
        var options = {
            method: "POST",
            url: "http://projects.sparkleinfotech.com/tTrecker/webservice",
            headers: {
                Cookie: "ci_session=iuf6khge03arjlvd5pep68u9gu8a1td9",
            },
            formData: {
                username: txtUser,
                password: txtPwd,
                eventName: "userLogin",
            },
        };
        request(options, function(error, response) {
            if (error) throw new Error(error);
            var obj = JSON.parse(response.body);
            if (obj.status == "SUCCESS") {
                store.set("Username", obj.tck_username);
                ipc.sendSync("entry-accepted", "ping");
                $(".ajax_loder").hide();
            } else {
                $("#lbl").text("Username or Password is incorrect.!");
                $(".ajax_loder").hide();
            }
        });
    } else {
        $("#lbl").text("Username or Password is incorrect.!");
    }
});