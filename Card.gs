var FIELDNAMES = ['Acceptence Rate']; // Put all different filters that we want

/**
 * Determines if a given email is a college email
 *
 * @param {string} email The given email
 * @returns {boolean}
 */
function isCollegeEmail(email){
  email = email.substring(email.indexOf('@'), email.length); // removes everything before the @ symbol
  if(email.indexOf('.edu') != -1) return true;
  return false;
}

/**
 * Gets emails from user inbox
 *
 * @returns {GmailMessage[]}
 */
function getEmails(){
  var returnedEmails = [];
  var threads = GmailApp.getInboxThreads();
  for(var i = 0; i < threads.length; i++){
    var message = threads[i].getMessages()[0];
    if(!message.isUnread()) continue; // Comment this if you want to filter through entire inbox
    if(isCollegeEmail(message.getFrom())) returnedEmails.push(message);
  }
  return returnedEmails;
}

/**
 * Creates the main UI for the addon
 *
 * @returns {CardBuilder}
 */
function createMainBody(opt_prefills, opt_status) {
  var card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle('Enter your info below'));
  
  var clearForm = CardService.newAction().setFunctionName('clearForm')
    .setParameters({'Status': opt_status ? opt_status : ''});
  var clearAction = CardService.newCardAction()
    .setText('Clear form')
    .setOnClickAction(clearForm);
  card.addCardAction(clearAction);


  // If we ever want an error page
  // if (opt_status) {
  //   if (opt_status.indexOf('Error: ') == 0) {
  //     opt_status = '<font color=\'#FF0000\'>' + opt_status + '</font>';
  //   } else {
  //     opt_status = '<font color=\'#228B22\'>' + opt_status + '</font>';
  //   }
  //   var statusSection = CardService.newCardSection();
  //   statusSection.addWidget(CardService.newTextParagraph()
  //     .setText('<b>' + opt_status + '</b>'));
  //   card.addSection(statusSection);
  // }

  var acceptenceRate = PropertiesService.getUserProperties().getProperty('acceptence'); // add more of these variables for each thing we want to filter by
  
  if (!acceptenceRate) {
    acceptenceRate = '0';
    PropertiesService.getUserProperties().setProperty('College_ID', '0');
  }
  var idLabel = CardService.newTextParagraph().setText('College ID #' + acceptenceRate);
  var baseSection = CardService.newCardSection().addWidget(idLabel);
  var formSection = createFormSection(baseSection, FIELDNAMES, opt_prefills);
  var startFiltering = CardService.newAction().setFunctionName('beginFilter');
  var submitButton = CardService.newTextButton()
    .setText('Start Filtering')
    .setOnClickAction(startFiltering);
  formSection.addWidget(CardService.newButtonSet().addButton(submitButton));

  
  card.addSection(formSection);

  return card;
}

/**
 * Creates form section to be displayed on card.
 *
 * @param {CardSection} section The card section to which form items are added.
 * @param {String[]} inputNames Names of titles for each input field.
 * @param {String[]} opt_prefills Default values for each input field.
 * @returns {CardSection}
 */
function createFormSection(section, inputNames, opt_prefills) {
  for (var i = 0; i < inputNames.length; i++) {
    var widget = CardService.newTextInput()
      .setFieldName(inputNames[i])
      .setTitle(inputNames[i]);
    if (opt_prefills && opt_prefills[i]) {
      widget.setValue(opt_prefills[i]);
    }
    section.addWidget(widget);
  }

  return section;
}



/**
 * Recreates the main card without prefilled data.
 *
 * @param {Event} e An event object containing form inputs and parameters.
 * @returns {Card}
 */
function clearForm(e) {
  return createExpensesCard(null, e['parameters']['Status']).build();
}

/**
 * Begins the email filtering proccess
 *
 * @returns {}
 */

function beginFilter(){
  // var res = e['formInput']; // res contains the form info for filtering

  // perform filtering
 
  var emails = getEmails();
  for(let e of emails){
    console.log(e.getFrom());
  }
}

/**
 * Creates a card letting users edit the most recent expense.
 * Form can be prefilled with values.
 *
 * @param {String[]} prevResults Default values for each input field.
 * @param {String} opt_status Optional status displayed at top of card.
 * @returns {Card}
 */
function createEditCard(prevResults, opt_status) {
  if (prevResults) {
    var prefills = objToArray(prevResults, FIELDNAMES.slice(0, FIELDNAMES.length - 1));
  }
  var card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle('Edit Your Expense'));

  var clearEditForm = CardService.newAction()
    .setFunctionName('clearEditForm')
    .setParameters({'Status': opt_status ? opt_status : ''});
  var clearAction = CardService.newCardAction()
    .setText('Clear form')
    .setOnClickAction(clearEditForm);
  card.addCardAction(clearAction);

  if (opt_status) {
    if (opt_status.indexOf('Error: ') == 0) {
      opt_status = '<font color=\'#FF0000\'>' + opt_status + '</font>';
    } else {
      opt_status = '<font color=\'#228B22\'>' + opt_status + '</font>';
    }
    var statusSection = CardService.newCardSection();
    statusSection.addWidget(CardService.newTextParagraph()
      .setText('<b>' + opt_status + '</b>'));
    card.addSection(statusSection);
  }

  var id = (parseInt(PropertiesService.getUserProperties().getProperty('College_ID')) - 1)
    .toString();
  var idLabel = CardService.newTextParagraph().setText('College ID #' + id);
  var baseSection = CardService.newCardSection().addWidget(idLabel);
  var formSection = createFormSection(baseSection,
                                      FIELDNAMES.slice(0, FIELDNAMES.length - 1), prefills);
  var editForm = CardService.newAction().setFunctionName('editForm');
  var editButton = CardService.newTextButton()
    .setText('Edit')
    .setOnClickAction(editForm);
  formSection.addWidget(CardService.newButtonSet().addButton(editButton));

  var url = PropertiesService.getUserProperties().getProperty('SPREADSHEET_URL');
  var openSpreadsheetButton = CardService.newTextButton()
    .setText('Open Spreadsheet')
    .setOpenLink(CardService.newOpenLink().setUrl(url));
  var openSpreadsheetSection = CardService.newCardSection()
    .addWidget(CardService.newButtonSet().addButton(openSpreadsheetButton));

  card.addSection(formSection);
  card.addSection(openSpreadsheetSection);

  return card;
}
