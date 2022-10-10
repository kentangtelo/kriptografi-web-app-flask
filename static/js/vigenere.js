$(document).ready(function(){
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
      const key = $("input[name='text-key']").val();
      const type = $(".process-btn").text().toLowerCase();
      const text = $("#plaintext-area").val();
      let data = {"type": type, "key": key, "text": text};
      $.ajax({
          url: "/api/vigenere/",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function(result) {
            $("#ciphertext-area").val(result.output);
          }
      });
    });
  });