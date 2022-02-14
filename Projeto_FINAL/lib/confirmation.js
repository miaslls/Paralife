const { validatePromptIntMinMax } = require("./validation");

// confirma uma escolha

exports.confirmation = () => {
    let confirmChoice = validatePromptIntMinMax(
      "digite [0] para voltar\ndigite [1] para confirmar",
      1,
      0,
      "Você deve digitar [0] ou [1]"
    );
  
    return confirmChoice;
  };