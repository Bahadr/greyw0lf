GREYW0LF
==================================================


What is GreyW0LF ?
--------------------------------------

GreyW0LF is a set of tools which is designed to reduce the time you spend on certain tasks and improve your developing speed and efficiency. GreyW0LF is currently in BETA.

 How do you add GreyW0LF to your project?
----------------------------

You can include GreyW0lf in your project with the "script" code like you do an ordinary JavaScript file

Example:
```html
<script src="greyw0lf.js"></script>
```
# Basic Usage

GreyW0LF's constructer function is gw_(). You can start a process about an object by sending its id to for instance gw_("OBJECT_ID) function as an argument. If you don't want to use the id, you can also use gw_(this) on the object.

Example 1
```js
gw_("OBJECT_ID").me().value="TEST";
```
<br/>
Example 2
```js
<input type="textbox" onkeyup="function(){ gw_(this).checkNumeric();}">
```




# Functions included in GreyW0LF

## AJAX TOOLS 

### .SEND_GET(FILE,PARAMETERS,RESPONSE_OBJECT,USER_DEFINED_FUNCTION)
Sends AJAX request to indicated file using GET method.<br/>
Takes 4 argument : <br/><br/>
1.FILE : Name of the file to be ajax requested  Ex: EXAMPLE.PHP<br/>
2.PARAMETERS : The GET parameters to be sent <br/> Ex: {"GET_1":"GET_1_VALUE","GET_2":"GET_2_VALUE"}<br/>
3.RESPONSE_OBJECT : If its not defined as false, it writes the AJAX answer in the object with the defined ID<br/>
4.USER_DEFINED_FUNCTION : The function to be triggered when the AJAX results come is defined in this argument

```js
gw_().SEND_GET("EXAMPLE.PHP",{"GET_1":"GET_1_VALUE"},false,function(response){ 
        alert(response);
 });
```

### .SEND_POST(FILE,PARAMETERS,RESPONSE_OBJECT,USER_DEFINED_FUNCTION)
Sends AJAX request to indicated file using POST method.<br/>
Takes 4 argument : <br/><br/>
1.FILE : Name of the file to be ajax requested . Ex: EXAMPLE.PHP<br/>
2.PARAMETERS : The POST parameters to be sent  <br/> Ex: {"POST_1":"POST_1_VALUE","POST_2":"POST_2_VALUE"}<br/>
3.RESPONSE_OBJECT : If its not defined as false, it writes the AJAX answer in the object with the defined ID<br/>
4.USER_DEFINED_FUNCTION : The function to be triggered when the AJAX results come is defined in this argument.

```js
gw_().SEND_POST("EXAMPLE.PHP",{"POST_1":"POST_1_VALUE"},false,function(response){ 
        alert(response);
 });
```

### .fillWithAjax(FILE,PARAMETERS)
Fills the selected object with the result which came out of AJAX.<br/><br/>
Takes 2 argument.<br/>

1.FILE : Name of the file to be ajax requested  . Ex: EXAMPLE.PHP<br/>
2.PARAMETERS : The POST parameters to be sent  <br/> Ex: {"POST_1":"POST_1_VALUE","POST_2":"POST_2_VALUE"}<br/>

```js
gw_("testdiv").fillWithAjax("EXAMPLE.PHP",{"POST_1":"POST_1_VALUE","POST_2":"POST_2_VALUE"});
```
## TABLE TOOLS

### .addCell(ROW_INDEX,USER_DEFINED_FUNCTION)
Adds a cell to the selected line of the selected table and sends that cell to the user defined function.
```js
    gw_("testtable").addCell(1,function(cell){ 
        cell.innerHTML="test";
    });
```

### .getCell(ROW,COLUMN)
Retrieves the cell in the selected column and line of the selected table.
```js
gw_("testtable").getCell(1,1).innerHTML="TEST";
```

###. setCell(ROW,COLUMN,CONTENT)
Updates the content of the cell in the selected column and line of the selected table.
```js
gw_("testtable").setCell(1,1,"TEST");
```

### .rowCount()
Returns row count of the selected table
```js
alert(gw_("testtable").rowCount());
```

### .colCount(ROW_INDEX);
Returns cell count of the selected tables selected row
```js
alert(gw_("testtable").colCount(1));
```

### .makeItGrid(ROWCOUNT,COLCOUNT,USER_DEFINED_FUNCTION)
Transforms the selected blank table into a datagrid according to defined column and line numbers. Processes made in the datagrid cells trigger the user defined function as cell lines, columns and contents.

```js
gw_("testtable").makeItGrid(5,5,function(row,col,data){
    alert("ROW:"+5+"/COLUMN:"+col+" New Content:"+data);
});
```

###. .setGridSource(JSON_DATASET)
Enables data transfer to the datagrid table.
```js
gw_("testtable").makeItGrid(5,5,function(row,col,data){
    alert("ROW:"+5+"/COLUMN:"+col+" New Content:"+data);
});

gw_("testtable").setGridSource([
        {"col":1 , "row":1,"data":"test"},
		{"col":5 , "row":3,"data":"test 2"}
]);
    
```

## GENERAL TOOLS

### .autoComplete(FILE,PARAMETERS,USER_DEFINED_FUNCTION)
Attributes autocomplete feature to the selected INPUT object. Transmits the INPUT content to the target file through a get value named as "keyword" . After the selection, selected id and value is sent to the defined function.
```js
gw_("testelement").autoComplete("test.php",
{"table":"user","field":"name"},
function(key,data){ alert(key+" "+data);}
);
```
JSON response should be like this
```js

[
{"qid":"1","qresult":"RESULT1"},
{"qid":"2","qresult":"RESULT2"},
{"qid":"3","qresult":"RESULT3"},
{"qid":"1","qresult":"RESULT1"},
{"qid":"2","qresult":"RESULT2"},

]
```

### .getContent()

This function enables you to fetch the content of the selected object. If the object has "innerHTML" feature, it will return an innerHTML value, and if it has a "value" feature, it wil return a "value" value.

```js
var content_of_object=gw_("testobject").getContent();
```

### .openCookie(COOKIE_NAME,COOKIE_CONTENT)

Enables you to generate a COOKIE with defined name and content.

```js
gw_().openCookie("EXAMPLE","EXAMPLE_VALUE");
```

### .getCookie(COOKIE_NAME)

Fetches the content of the selected COOKIE.

```js
var COOKIE_CONTENT=gw_().getCookie("EXAMPLE");
```

### .sizeInfo()

Returns the height and width of the selected object.

```js
var width=gw_("testobject").sizeInfo().width;
var height=gw_("testobject").sizeInfo().height;
```

### .dragIt(DROP_OBJECT,ADDITIONAL_DATA,CALLBACK_FUNCTION)
Attributes "drag/drop" feature to the object. <br/><br/>
Takes 3 arguments:<br/><br/>
1-DROP_OBJECT : ID of the object on which the object will be dropped<br/><br/>
2-ADDITTIONAL_DATA : Enables you to give value and title features to the object. These values will be sent to the selected callback function during dropping process.<br/><br/>
3-CALLBACK_FUNCTION : When an object is dropped, if its on the DROP_OBJECT coordinates, the function to be processed is defined in this argument.<br/>

```html
<div id="dropdiv"   style="width:200px;height:250px;background-color:red"></div>
<div id="dragdiv"   style="width:100px;height:100px;background-color:green">DRAG ME TO RED DIV</div>
```

```js
gw_("dragdiv").dragIt("dropdiv",{"value":"1","title":"LOREM IPSUM"},function(value,title){
    alert("MYVALUE="+value+" MYTITLE="+title);
});    
```
### .checkAndSubmit(REQUIRED_FIELD_LIST);
Checks if the required sections in the form are filled out. If not, marks those sections with red and doesn't allow you to submit the form.
```html
<form id="testform">
    <input id="tftxt1">
	<input id="tftxt2" >
	<select id="tfsel1" >
		<option value="">CHOOSE</option>
		<option value="1">OPTION 1</option>
		<option value="2">OPTION 2</option>
	</select>
	CB <input type="checkbox" id="tfchck">
	RDB <input type="radio">
</form>
```
```js
gw_("testform").checkAndSubmit(new Array("tftxt1","tftxt2","tfsel1","tfchck"));
```

### .linkify()

Transforms the url sentences in the object into links and push the links into an array.

```html
<div id="testdiv">
    Hello http://www.github.com
</div>
```

```js
var links_of_testdiv=gw_("testdiv").linkify();
alert(links_of_testdiv);
```


### .checkNumeric(USER_DEFINED_FUNCTION) 
Checks if the INPUT object content is numeric or alphanumeric and sends the result to the user defined function

```html
<input id="testelement" value="123">
```

```js
gw_("testelement").checkNumeric(function(isNumeric){
    if(isNumeric){
        alert("Value is numeric");
    }else{
        alert("Values is alphanumeric");
    }
    
});
```

### .openNoticeBox(BOX_ID,WIDTH,HEIGHT,XPOS,YPOS,CONTENT)
Creates a notice box with defined features
<br/> <br/>
Takes six argument : <br/> <br/>
1- BOX_ID : notice box id <br/> 
2- WIDTH : notice box width <br/> 
3- HEIGHT : notice box height<br/> 
4- XPOS : notice box x position <br/> 
5- YPOS : notice box y position<br/> 
6- CONTENT : content of notice
```js
gw_().openNoticeBox("MY_ID",300,500,5,15,"LOREM IPSUM");
```
### .findCoordinates()
You can get the vertical and horizontal location of the object using this function

```js
alert(gw_("testelement").findCoordinates().Y); 
alert(gw_("testelement").findCoordinates().X);
```

### .object2text();
Transforms the object (a div, for instance) to a text box.

```js
gw_("testdiv").object2text();
```

### .text2object(OBJECT_TAG);
Transforms the text box to an object.

```js
gw_("testdiv").text2object("div");
```

### .tubeIt(YOUTUBE_HASH_CODE,WIDTH,HEIGHT)
Embeds the youtube video with a defined hash code into an object according to selected sizes.

```js
gw_("testdiv").tubeIt("BTxnSTKorZw",100,100);
```

### .autoLoad(USER_DEFINED_FUNCTION);
Once the DOM content is fully loaded, the function(s) to be processed can be defined using this function<br/>
```js
gw_().autoLoad(function(){
    alert("DOCUMENT LOADED");
});
```

### .$_GET(GET_REQUEST)
Fetches the GET requests sent to the page.

```js
gw_().$_GET("id");
gw_().$_GET("user");
```

### .eclipse(true/false);
When a true value is sent, it dims out the screen and makes it impossible to click on any object. In the case of a false value, it removes the obscuration.

```js
    gw_().eclipse(true);
```

### .urlOpen(URL);
Opens the selected URL in the object through IFRAME and resizes it to fit the object.

```js
    gw_().urlOpen("http://www.github.com");
```

### .addOpt(JSON_DATASET)

Add option(s) to selected "select" object.


```html
<select id="test_select">
    <option value="1">option 1</option>
</select>
```

```js
   gw_("test_select").addOpt([
   {"opt":"Option 2","val":"2"},
   {"opt":"Option 3","val":"3"}
   ]);
```

### .setCss(RULE/JSON_DATASET,RULE_VALUE)
Enables you to define one or more styles.<br/>

Singular style define: 
```js
    gw_("testdiv").setCss("margin-left","15px");
```

Plural style define:
```js
gw_("testdiv").setCss([
    {"style":"margin-left","value":"5px"},
    {"style":"background-color","value":"blue"}
]);
```

### .refresh()
Reloads the object to the memory
```js
    gw_("testdiv").refresh();
```

## EFFECTS

### .fadeItOut(USER_DEFINED_FUNCTION);
Becoming transparent, the object starts to fade out and when it completely does, it triggers the user defined function.

```js
    gw_("testelement").fadeItOut(function(){
        alert("completed");
    });
```


### .fadeItIn(USER_DEFINED_FUNCTION);
The object starts to opacificate and become visible. When it completely becomes visible, it triggers the defined function.

```js
    gw_("testelement").fadeItIn(function(){
        alert("completed");
    });
```


### .enlarge(WIDTH,HEIGHT,INTERVAL,USER_DEFINED_FUNCTION);
Enlarges the object to the defined values and when the process is completed it triggers the defined function.


```js
   gw_("testdiv").enlarge(300,300,1,function(){
       alert("completed");
   });
```

If there are values you dont want to enlarge, you can send them as false so that they wont be included in the process.

```js
   gw_("testdiv").enlarge(false,300,1,function(){
       
       alert("completed");
   });
```



### .minimize(WIDTH,HEIGHT,INTERVAL,USER_DEFINED_FUNCTION);
Minimizes the object to the defined values and when the process is completed it triggers the defined function.


```js
   gw_("testdiv").minimize(10,10,1,function(){
       alert("completed");
   });
```


If there are values you don't want to minimize, you can send them as false so that they wont be included in the process.

```js
   gw_("testdiv").minimize(false,10,1,function(){
       
       alert("completed");
   });
```

### .move(XPOS,YPOS,INTERVAL,USER_DEFINED_FUNCTION);
Moves the object towards the defined values and when the process is completed, it triggers the defined function.

```js
 gw_("testdiv").move(250,250,1,function(){
     alert("completed");
 });
```


If there are values you dont want to move, you can send them as false so that they wont be included in the process.

```js
   gw_("testdiv").move(250,false,1,function(){
     alert("completed");
 });
```

## ARRAY PROCESS TOOLS

### forEach(DATASET,USER_DEFINED_FUNCTION)
Returns the key and content values of the selected associated array
```js
    gw_().forEach({"DATA1":"D1","DATA2":"D2"},function(title,val){
        alert(title+" "+val);
    });
```

### arraySearch(ARRAY,KEYWORD)
Searches for a value in the selected array. When it finds, returns true and when it can't it returns false value.
```js
arr=new Array("X","Y","Z");
alert(gw_().arraySearch(arr,"X"));
```
### getArrayKeys(ARRAY)
Returns the key values of the selected associated array
```js
gw_().getArrayKeys({"key1":"key1_value","key2":"key2_value"});
```

## DOM TOOLS

### .create(TAGNAME)
Creates an object with a defined tag and returns
```js
gw_().create("div");
```

### .removeIt()
Removes selected object
```js
gw_("testdiv").removeIt();
```
### .getParent()
Returns selected object parent

```js
gw_("testdiv").getParent();
```

### .addChild(CHILD_OBJECT)
Add child to selected object.
```js
gw_("testdiv").addChild(document.createElement("button"));
```

### .delChild(CHILD_INDEX)
Deletes the child object whose index value is given from selected object
```js
gw_("testdiv").delChild(2);
```

### .getChild(CHILD_INDEX)
Returns the child object whose index value is given from selected object
```js
alert(gw_("testdiv").getChild(1));
```

### .getChilds()
Returns all childs of selected object
```js
gw_("testdiv").getChilds();
```

### .me()
Returns object itself

```js
alert(gw_("testdiv").me().innerHTML);
```

<br/>
Translated By <b>Süleyman Kalaycı</b> - contact : <i><b>soloymon@gmail.com</b></i>