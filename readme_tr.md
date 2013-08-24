GREYW0LF
==================================================


GreyW0LF nedir ?
--------------------------------------

GreyW0LF javascript üzerinde yapmanızın vakit aldığı bir takım işlemleri kolaylaştırmak ve daha hızlı geliştirme yapmanızı sağlamak için
geliştirilmiş bir araçlar topluluğudur.GreyW0LF şuan BETA Sürüm seviyesindedir.

GreyW0LF'u projenize nasıl dahil edebilirsiniz ?
----------------------------

Normal bir JavaScript dosyasını dahil ettiğiniz şekilde script kodu ile GreyW0lf'u projenize dahil edebilirsiniz.

```html
<script src="greyw0lf.js"></script>
```
# Kullanımı

GreyW0LF'un constructer fonksiyonu gw_()'dir.İşlem yapmak istediğimiz objenin id'sini argüman olarak (örn:gw_("OBJE_ID")) fonksiyonuna gönderdiğimizde onunla ilgili işlemleri başlatabiliriz.Id ile göndermek istemiyorsak objenin kendi içinde gw_(this) şeklinde de gönderebiliriz.

Örnek 1
```js
gw_("OBJE_ID").me().value="TEST";
```
<br/>
Örnek 2
```js
<input type="textbox" onkeyup="function(){ gw_(this).checkNumeric();}">
```



# GreyW0LF'un içerdiği Fonksiyonlar

## AJAX Araçları 

### .SEND_GET(FILE,PARAMETERS,RESPONSE_OBJECT,USER_DEFINED_FUNCTION)
Belirtilen dosyaya GET metodu ile AJAX isteği gönderir.<br/>
4 Argüman almaktadır : <br/><br/>
1.FILE : AJAX isteği yapılacak dosyanın adı . örn: EXAMPLE.PHP<br/>
2.PARAMETERS : gönderilecek get parametreleri  <br/> örn: {"GET_1":"GET_1_VALUE","GET_2":"GET_2_VALUE"}<br/>
3.RESPONSE_OBJECT : Eğer false olarak tanımlanmamışsa , belirtilen id'li objenin içine AJAX cevabını yazar.<br/>
4.AJAX sonucu geldiğinde tetiklenecek fonksiyon burada tanımlanır.

```js
gw_().SEND_GET("EXAMPLE.PHP",{"GET_1":"GET_1_VALUE"},false,function(response){ 
        alert(response);
 });
```

### .SEND_POST(FILE,PARAMETERS,RESPONSE_OBJECT,USER_DEFINED_FUNCTION)
Belirtilen dosyaya POST metodu ile AJAX isteği gönderir.<br/>
4 Argüman almaktadır : <br/><br/>
1.FILE : AJAX isteği yapılacak dosyanın adı . örn: EXAMPLE.PHP<br/>
2.PARAMETERS : gönderilecek get parametreleri  <br/> örn: {"POST_1":"POST_1_VALUE","POST_2":"POST_2_VALUE"}<br/>
3.RESPONSE_OBJECT : Eğer false olarak tanımlanmamışsa , belirtilen id'li objenin içine AJAX cevabını yazar.<br/>
4.AJAX sonucu geldiğinde tetiklenecek fonksiyon burada tanımlanır.

```js
gw_().SEND_POST("EXAMPLE.PHP",{"POST_1":"POST_1_VALUE"},false,function(response){ 
        alert(response);
 });
```

### .fillWithAjax(FILE,PARAMETERS)
Belirtilen objenin içini AJAX'tan gelen sonuç ile doldurur.<br/><br/>
2 argüman alır.<br/>

1.FILE : AJAX isteği yapılacak dosyanın adı . örn: EXAMPLE.PHP<br/>
2.PARAMETERS : gönderilecek get parametreleri  <br/> örn: {"POST_1":"POST_1_VALUE","POST_2":"POST_2_VALUE"}<br/>

```js
gw_("testdiv").fillWithAjax("EXAMPLE.PHP",{"POST_1":"POST_1_VALUE","POST_2":"POST_2_VALUE"});
```
## Tablo Araçları

### .addCell(ROW_INDEX,USER_DEFINED_FUNCTION)
Belirtilen tablonun belirtilen satırına bir hücre ekler ve eklediği hücreyi kullanıcı tanımlı fonksiyona gönderir.
```js
    gw_("testtable").addCell(1,function(cell){ 
        cell.innerHTML="test";
    });
```

### .getCell(ROW,COLUMN)
Belirtilen tablonun belirtilen satır ve sütunundaki hücreyi getirir.
```js
gw_("testtable").getCell(1,1).innerHTML="TEST";
```

###. setCell(ROW,COLUMN,CONTENT)
Belirtilen tablonun belirtilen satır ve sütunundaki hücrenin içeriğini günceller.
```js
gw_("testtable").setCell(1,1,"TEST");
```

### .rowCount()
Belirtilen tablonun satır sayısını getirir.
```js
alert(gw_("testtable").rowCount());
```

### .colCount(ROW_INDEX);
Belirtilen tablonun belirtilen satırının hücre sayısını verir.
```js
alert(gw_("testtable").colCount(1));
```

### .makeItGrid(ROWCOUNT,COLCOUNT,USER_DEFINED_FUNCTION)
Belirtilen boş tabloyu belirtilen satır ve sütun sayısında bir datagrid haline getirir.datagrid hücelerinde yapılan işlemler hücre satırı , sütunu ve içeriği olarak kullanıcı tanımlı fonksiyonu tetikler.

```js
gw_("testtable").makeItGrid(5,5,function(row,col,data){
    alert("ROW:"+5+"/COLUMN:"+col+" New Content:"+data);
});
```

### .setGridSource(JSON_DATASET)
Datagrid haline gelmiş tabloya veri aktarımı yapabilmeyi sağlar.
```js
gw_("testtable").makeItGrid(5,5,function(row,col,data){
    alert("ROW:"+5+"/COLUMN:"+col+" New Content:"+data);
});

gw_("testtable").setGridSource([
        {"col":1 , "row":1,"data":"test"},
		{"col":5 , "row":3,"data":"test 2"}
]);
    
```

## Genel Araçlar


### .autoComplete(FILE,PARAMETERS,USER_DEFINED_FUNCTION)
Belirtilen INPUT objesine autocomplete özelliği kazandırır.Hedef dosyaya INPUT içeriğini "keyword" isimli bir get değeri ile taşır.Seçim yapıldıktan sonra seçilen id ve değeri tanımlanan fonksiyona gönderir.
```js
gw_("testelement").autoComplete("test.php",
{"table":"user","field":"name"},
function(key,data){ alert(key+" "+data);}
);
```
Dosyadan dönecek JSON değer şu şekilde olmalıdır :
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

Bu fonksiyon ile belirtilen objenin içeriğini alabilirsiniz.Objeniz innerHTML özelliği taşıyan bir obje ise innerHTML , value özelliği taşıyan bir obje ise value değeri dönecektir.

```js
var content_of_object=gw_("testobject").getContent();
```

### .openCookie(COOKIE_NAME,COOKIE_CONTENT)

Belirtilen isimde ve içerikte bir COOKIE oluşturulmasını sağlar.

```js
gw_().openCookie("EXAMPLE","EXAMPLE_VALUE");
```

### .getCookie(COOKIE_NAME)

Belirtilen COOKIE'nin içeriğini getirir

```js
var COOKIE_CONTENT=gw_().getCookie("EXAMPLE");
```

### .sizeInfo()

Belirtilen objenin yükseklik ve genişliğini döndürür.

```js
var width=gw_("testobject").sizeInfo().width;
var height=gw_("testobject").sizeInfo().height;
```

### .dragIt(DROP_OBJECT,ADDITIONAL_DATA,CALLBACK_FUNCTION)
Objeye sürükle/bırak özelliği kazandırır. <br/><br/>
Bu fonksiyonun 3 argümanı bulunmaktadır:<br/><br/>
1-DROP_OBJECT : objenin üzerine bırakılacağı objenin id'si <br/><br/>
2-ADDITTIONAL_DATA : objeye value ve title özellikleri vermenizi sağlar bu değerler bırakma esnasında belirttiğiniz callback fonksiyona gönderilecektir. <br/><br/>
3-CALLBACK_FUNCTION : obje bırakıldığında eğer DROP_OBJECT koordinatlarındaysa işletilecek fonksiyonu bu kısımda tanımlayabiliriz.

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
Formdaki zorunlu alanların doldurulup doldurulmadığını kontrol eder.Eğer zorunlu alanlar doldurulmadıysa o alanları kırmızı ile işaretler ve formu göndermez.
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

Objenin içinde geçen url cümleleri link haline getirir ve bulunan linkleri bir dizi halinde döndürür.

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
INPUT obje içeriğinin numerik mi alfanumerik mi olduğunu kontrol eder ve bulduğu sonucu kullanıcı tanımlı fonksiyona gönderir.

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
Belirtilen özelliklerde bir uyarı kutusu oluşturur.
<br/> <br/>
Bu fonksiyonun 6 argümanı bulunmaktadır : <br/> <br/>
1- BOX_ID : oluşturulacak uyarı kutusunun id'si. <br/> 
2- WIDTH : oluşturulacak uyarı kutusunun genişliği. <br/> 
3- HEIGHT : oluşturulacak uyarı kutusunun yüksekliği. <br/> 
4- XPOS : oluşturulacak uyarı kutusunun yatay pozisyonu. <br/> 
5- YPOS : oluşturulacak uyarı kutusunun dikey pozisyonu. <br/> <br/>
6- CONTENT : oluşturulacak uyarı kutusunun içeriği
```js
gw_().openNoticeBox("MY_ID",300,500,5,15,"LOREM IPSUM");
```
### .findCoordinates()
Objenin yatay ve dikey konumunu bu fonksiyon ile alabiliriz.

```js
alert(gw_("testelement").findCoordinates().Y); 
alert(gw_("testelement").findCoordinates().X);
```

### .object2text();
Objeyi (örneğin bir div'i) metin kutusuna çevirir.

```js
gw_("testdiv").object2text();
```

### .text2object(OBJECT_TAG);
Metin kutusunu objeye çevirir.

```js
gw_("testdiv").text2object("div");
```

### .tubeIt(YOUTUBE_HASH_CODE,WIDTH,HEIGHT)
Hash code'u tanımlanmış youtube videosunu belirtilen boyutlarda objenin içine yerleştirir.

```js
gw_("testdiv").tubeIt("BTxnSTKorZw",100,100);
```

### .autoLoad(USER_DEFINED_FUNCTION);
DOM içeriği tamamen yüklendikten sonra işletilmesini istediğimiz fonksiyonu/fonksiyonları bu özellik ile tanımlayabiliriz <br/>
```js
gw_().autoLoad(function(){
    alert("DOCUMENT LOADED");
});
```

### .$_GET(GET_REQUEST)
Sayfaya gönderilmiş GET isteklerinin içeriğini çeker.

```js
gw_().$_GET("id");
gw_().$_GET("user");
```

### .eclipse(true/false);
True değer gönderildiğinde ekranı karartır ve hiçbir objeye tıklanmamasını sağlar.False gönderildiğinde ise karartmayı kaldırır.

```js
    gw_().eclipse(true);
```

### .urlOpen(URL);
Belirtilen URL'yi IFRAME vasıtasıyla objenin boyutlarına sığdıracak şekilde objenin içinde açar.

```js
    gw_().urlOpen("http://www.github.com");
```

### .addOpt(JSON_DATASET)

Select objesine option ekler.


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
Tekil veya çoğul stiller tanımlayabilmenizi sağlar.<br/>

Bireysel stil tanımlama: 
```js
    gw_("testdiv").setCss("margin-left","15px");
```

Toplu stil tanımlama:
```js
gw_("testdiv").setCss([
    {"style":"margin-left","value":"5px"},
    {"style":"background-color","value":"blue"}
]);
```

### .refresh()
Objeyi tekrar belleğe yükler.
```js
    gw_("testdiv").refresh();
```

## Efektler

### .fadeItOut(USER_DEFINED_FUNCTION);
Obje transparanlaşarak gözden kaybolur ve kaybolma işlemi tamamlandığında belirtilen fonksiyonu tetikler.

```js
    gw_("testelement").fadeItOut(function(){
        alert("completed");
    });
```


### .fadeItIn(USER_DEFINED_FUNCTION);
Obje opaklaşarak görünür hale gelir ve görünür olma işlemi tamamlandığında belirtilen fonksiyonu tetikler.

```js
    gw_("testelement").fadeItIn(function(){
        alert("completed");
    });
```


### .enlarge(WIDTH,HEIGHT,INTERVAL,USER_DEFINED_FUNCTION);
Objeyi belirtilen değerlere doğru belirtilen hızda büyültür ve işlem tamamlandığında tanımlanan fonksiyonu çalıştırır.


```js
   gw_("testdiv").enlarge(300,300,1,function(){
       alert("completed");
   });
```

Büyümesini istemediğimiz değeri false olarak gönderirsek işleme dahil olmaz.

```js
   gw_("testdiv").enlarge(false,300,1,function(){
       
       alert("completed");
   });
```



### .minimize(WIDTH,HEIGHT,INTERVAL,USER_DEFINED_FUNCTION);
Objeyi belirtilen değerlere doğru belirtilen hızda küçültür ve işlem tamamlandığında tanımlanan fonksiyonu çalıştırır.


```js
   gw_("testdiv").minimize(10,10,1,function(){
       alert("completed");
   });
```

Küçülmesini istemediğimiz değeri false olarak gönderirsek işleme dahil olmaz.

```js
   gw_("testdiv").minimize(false,10,1,function(){
       
       alert("completed");
   });
```

### .move(XPOS,YPOS,INTERVAL,USER_DEFINED_FUNCTION);
Objeyi belirtilen değerlere doğru hareket ettirir ve işlem tamamlandığında tanımlanan fonksiyonu çalıştırır.

```js
 gw_("testdiv").move(250,250,1,function(){
     alert("completed");
 });
```

Hareket etmesini istemediğimiz değeri false olarak gönderirsek işleme dahil olmaz.

```js
   gw_("testdiv").move(250,false,1,function(){
     alert("completed");
 });
```

## Dizi İşleme Araçları

### forEach(DATASET,USER_DEFINED_FUNCTION)
Belirtilen associated dizinin anahtar ve içerik değerlerini çevirir.
```js
    gw_().forEach({"DATA1":"D1","DATA2":"D2"},function(title,val){
        alert(title+" "+val);
    });
```

### arraySearch(ARRAY,KEYWORD)
Belirtilen dizinin içinde bir değeri arar bulduğunda true , bulamadığında false değer döndürür.
```js
arr=new Array("X","Y","Z");
alert(gw_().arraySearch(arr,"X"));
```
### getArrayKeys(ARRAY)
Belirtilen associated dizinin key değerlerini çevirir.
```js
gw_().getArrayKeys({"key1":"key1_value","key2":"key2_value"});
```

## DOM Araçları

### .create(TAGNAME)
Belirtilen tag ile bir obje oluşturur ve çevirir.
```js
gw_().create("div");
```

### .removeIt()
Belirtilen objeyi siler.
```js
gw_("testdiv").removeIt();
```
### .getParent()
Belirtilen objenin parent objesini çevirir.

```js
gw_("testdiv").getParent();
```

### .addChild(CHILD_OBJECT)
Belirtilen objeye child obje ekler.
```js
gw_("testdiv").addChild(document.createElement("button"));
```

### .delChild(CHILD_INDEX)
Belirtilen objeden indeks değeri verilen child objeyi siler.
```js
gw_("testdiv").delChild(2);
```

### .getChild(CHILD_INDEX)
Belirtilen objenin indeks değeri verilen child objesini getirir.
```js
alert(gw_("testdiv").getChild(1));
```

### .getChilds()

Belirtilen objenin tüm child objelerini dizi halinde döndürür.
```js
gw_("testdiv").getChilds();
```

### .me()
Belirtilen objenin kendisini çevirir.

```js
alert(gw_("testdiv").me().innerHTML);
```

