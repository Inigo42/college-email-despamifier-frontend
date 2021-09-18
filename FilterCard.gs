//The card where all the filters are managed

function masterCardBuilder() {

//Section 0 = Overall Ranking 

    let section0TopDivider = CardService.newDivider();
    
    let section0TextParagraph = CardService.newTextParagraph()
    .setText("1) Ranking Range");

    let section0TextInput0 = CardService.newTextInput()
        .setFieldName("rankingRange")
        .setHint("Enter the number of your lowest desired ranking. Ex: '50' --> The top 50 Schools in the USA");

    let section0CheckBox = CardService.newSelectionInput()
              .setType(CardService.SelectionInputType.CHECK_BOX)
              .setFieldName("checkbox0")
              .addItem("Don't Include This Filter", "checkbox0Status", false)

              .setOnChangeAction(CardService.newAction()
                  .setFunctionName("handleCheckbox0Change"));

    let section0Content = CardService.newCardSection()
        .addWidget(section0TopDivider)
        .addWidget(section0TextParagraph)
        .addWidget(section0TextInput0)
        .addWidget(section0CheckBox)

//Section 1 = Acceptance Rate

    let section1TextParagraph = CardService.newTextParagraph()
    .setText("2) Acceptance Rate");

    let section1TextInput0 = CardService.newTextInput()
        .setFieldName("minAcceptanceRate")
        .setHint("Minimum Acceptance Rate");

    let section1TextInput1 = CardService.newTextInput()
        .setFieldName("maxAcceptanceRate")
        .setHint("Maximum Acceptance Rate");

    let section1CheckBox = CardService.newSelectionInput()
              .setType(CardService.SelectionInputType.CHECK_BOX)
              .setFieldName("checkbox1")
              .addItem("Don't Include This Filter", "checkbox1Status", false)

              .setOnChangeAction(CardService.newAction()
                  .setFunctionName("handleCheckbox1Change"));

    let section1Content = CardService.newCardSection()
        .addWidget(section1TextParagraph)
        .addWidget(section1TextInput0)
        .addWidget(section1TextInput1)
        .addWidget(section1CheckBox)

//Section 2 = Total Student Body Size

    let section2TextParagraph = CardService.newTextParagraph()
    .setText("3) Total Student Body Size");

    let section2TextInput0 = CardService.newTextInput()
        .setFieldName("minStudentBodySize")
        .setHint("Minimum Student Body Size");

    let section2TextInput1 = CardService.newTextInput()
        .setFieldName("maxStudentBodySize")
        .setHint("Maximum Student Body Size");

    let section2CheckBox = CardService.newSelectionInput()
              .setType(CardService.SelectionInputType.CHECK_BOX)
              .setFieldName("checkbox2")
              .addItem("Don't Include This Filter", "checkbox2Status", false)

              .setOnChangeAction(CardService.newAction()
                  .setFunctionName("handleCheckbox2Change"));

    let section2Content = CardService.newCardSection()
        .addWidget(section2TextParagraph)
        .addWidget(section2TextInput0)
        .addWidget(section2TextInput1)
        .addWidget(section2CheckBox)

//Section 3 = SAT

    let section3TextParagraph = CardService.newTextParagraph()
    .setText("4) Average SAT Score");

    let section3TextInput0 = CardService.newTextInput()
        .setFieldName("minSATScore")
        .setHint("Minimum SAT Score");

    let section3TextInput1 = CardService.newTextInput()
        .setFieldName("maxSATScore")
        .setHint("Maximum SAT Score");

    let section3CheckBox = CardService.newSelectionInput()
              .setType(CardService.SelectionInputType.CHECK_BOX)
              .setFieldName("checkbox3")
              .addItem("Don't Include This Filter", "checkbox3Status", false)

              .setOnChangeAction(CardService.newAction()
                  .setFunctionName("handleCheckbox3Change"));

    let section3Content = CardService.newCardSection()
        .addWidget(section3TextParagraph)
        .addWidget(section3TextInput0)
        .addWidget(section3TextInput1)
        .addWidget(section3CheckBox)

//Section 4 = ACT

    let section4TextParagraph = CardService.newTextParagraph()
    .setText("5) Average ACT Score");

    let section4TextInput0 = CardService.newTextInput()
        .setFieldName("minACTScore")
        .setHint("Minimum ACT Score");

    let section4TextInput1 = CardService.newTextInput()
        .setFieldName("maxACTScore")
        .setHint("Maximum ACT Score");

    let section4CheckBox = CardService.newSelectionInput()
              .setType(CardService.SelectionInputType.CHECK_BOX)
              .setFieldName("checkbox4")
              .addItem("Don't Include This Filter", "checkbox4Status", false)

              .setOnChangeAction(CardService.newAction()
                  .setFunctionName("handleCheckbox4Change"));

    let section4Content = CardService.newCardSection()
        .addWidget(section4TextParagraph)
        .addWidget(section4TextInput0)
        .addWidget(section4TextInput1)
        .addWidget(section4CheckBox)

//Section 5 = State

    let section5TextParagraph = CardService.newTextParagraph()
    .setText("6) States");

    let section5TextInput0 = CardService.newTextInput()
        .setFieldName("text_input_form_input_key")
        .setHint("Enter state abbreviations separated by commas. Ex = 'IL,NY,CA'");

    let section5CheckBox = CardService.newSelectionInput()
              .setType(CardService.SelectionInputType.CHECK_BOX)
              .setFieldName("checkbox5")
              .addItem("Don't Include This Filter", "checkbox5Status", false)

              .setOnChangeAction(CardService.newAction()
                  .setFunctionName("handleCheckbox5Change"));

    let section5Content = CardService.newCardSection()
        .addWidget(section5TextParagraph)
        .addWidget(section5TextInput0)
        .addWidget(section5CheckBox)

//Section 6 = Yearly Tuition

    let section6TextParagraph = CardService.newTextParagraph()
    .setText("7) Yearly Tuition");

    let section6TextInput0 = CardService.newTextInput()
        .setFieldName("maxYearlyTution")
        .setHint("Maximum Yearly Tuition");

    let section6CheckBox = CardService.newSelectionInput()
              .setType(CardService.SelectionInputType.CHECK_BOX)
              .setFieldName("checkbox6")
              .addItem("Don't Include This Filter", "checkbox6Status", false)

              .setOnChangeAction(CardService.newAction()
                  .setFunctionName("handleCheckbox6Change"));

    let section6Content = CardService.newCardSection()
        .addWidget(section6TextParagraph)
        .addWidget(section6TextInput0)
        .addWidget(section6CheckBox)

//Section 7 = School Name (must implement school database lookup feature)

//Final Section = Save

    let saveButtonAction = CardService.newAction()
        .setFunctionName('onSaveButtonPress');

    let saveButton = CardService.newTextButton()
        .setText('Save')
        .setOnClickAction(saveButtonAction)
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED);
        
    let finalSectionContent = CardService.newCardSection()
        .addWidget(saveButton)

//Where each filter section is added for building

    let masterCard = CardService.newCardBuilder()
        .addSection(section0Content)
        .addSection(section1Content)
        .addSection(section2Content)
        .addSection(section3Content)
        .addSection(section4Content)
        .addSection(section5Content)
        .addSection(section6Content)
        .addSection(finalSectionContent)
        .build();

   return masterCard;
}
