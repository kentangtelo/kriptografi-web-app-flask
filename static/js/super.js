$(document).ready(function(){
    $(".step-down-btn1").click(function(){
        const n_input = $("input[name='number-setting-caesar']")[0]
        let c_v = parseInt(n_input.value);
        n_input.value = c_v - 1;
    
      });
      $(".step-up-btn1").click(function(){
        const n_input = $("input[name='number-setting-caesar']")[0]
        let c_v = parseInt(n_input.value);
        n_input.value = c_v + 1;
      });
      $(".step-down-btn2").click(function(){
        const n_input = $("input[name='number-setting-rail']")[0]
        let c_v = parseInt(n_input.value);
        n_input.value = c_v - 1;
    
      });
      $(".step-up-btn2").click(function(){
        const n_input = $("input[name='number-setting-rail']")[0]
        let c_v = parseInt(n_input.value);
        n_input.value = c_v + 1;
      });
    $("input[name='text-key']").val();
    $(".action-encode").click(function () {
      $(".action-encode").toggleClass("mid-box-action-active");
      $(".action-decode").toggleClass("mid-box-action-active");
      $(".process-btn").text("Encrypt");
      $("#plaintext-area").val("");
      $("#ciphertext-area").val("");
      $(".box-title-right").text("Ciphertext");
      $(".box-title-left").text("Plaintext");
    });
    $(".action-decode").click(function () {
      $(".action-decode").toggleClass("mid-box-action-active");
      $(".action-encode").toggleClass("mid-box-action-active");
      $(".process-btn").text("Decrypt");
      $("#plaintext-area").val("");
      $("#ciphertext-area").val("");
      $(".box-title-right").text("Plaintext");
      $(".box-title-left").text("Ciphertext");
    });
    $(".process-btn").click(function () {
      const key1 = $("input[name='number-setting-caesar']").val();
      const key2 = $("input[name='number-setting-rail']").val();
      const key3 = $("input[name='text-key']").val();
      const type = $(".process-btn").text().toLowerCase();
      const text = $("#plaintext-area").val();
      let data = {"type": type, "key1": key1, "key2": key2, "key3": key3, "text": text};
      $.ajax({
          url: "/api/super/",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function(result) {
            $("#ciphertext-area").val(result.output);
          }
      });
    });
  });