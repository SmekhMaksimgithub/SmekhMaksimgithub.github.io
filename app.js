let tg = window.Telegram.WebApp;
tg.expand();

let item ="";


function getById(id)
{
for(var i=0; i<cocktails_array.length;i++)
{
if(cocktails_array[i].id==id)
return cocktails_array[i];
}


}
   checkboxes = document.getElementsByClassName('larger');





        filter_data=["","",""];

        var filter_word = "";
        filters = [["Крепкий", "Слабоалкогольный", "Безалкогольный"], ["Горький","Кислый", "Сладкий"], ["На водке","На джине", "На роме","На текиле"]];

        function get_checks()
        {


            filter_data=["","",""];
            var t=0;
            for(var i =0; i<filters.length;i++)
            for(var j =0; j<filters[i].length;j++)
            {
                if(checkboxes[t].checked == true)
                filter_data[i]+=filters[i][j];
                //console.log(filters[i][j]);
                t++;
            }
            //console.log(filter_data);
        }

	   function reset()
	    {
            filter_data=["","",""];
            for(var i=0; i<checkboxes.length; i++)
            {
                checkboxes[i].checked = false;
            }

        }

       function set_checkboxes()
	    {

            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].onclick= function()
                {
                    get_checks();
                }
            }
	    }





reset();
set_checkboxes();

   var filter_img = document.getElementById("filter_img");
    var filter_label = document.getElementById("filter_label");
    var filter_btn = document.getElementById("filter_btn");

    var popup = document.getElementById("okno");
    var ctitle = document.getElementById("ctitle");
    var search_btn = document.getElementById("search_btn");
    var search_input = document.getElementById("search_input");

    var search_img = document.getElementById("search_img");
    var catalogue = document.getElementById("catalogue");

    var bool2 = false;

    var order_window = document.getElementById("order_window");
    var order_item = document.getElementById("order_item");
    var order_internal= document.getElementById("order_internal");
    var id_to_send=1;

    function closeext()
    {
            if(search_bool==1)
            {
                 search_img.src = "icn/search.svg";
                popup.style.display='none';
                filter_word="";
                search_input.value="";
                search_bool=0;
                
            }
             catalogue.style.display = 'none';

    }

    function get_boolean(element)
    {
        if(element.available==0)
        return true;
        
        var smallname = (element.name).toLowerCase();
        
        if(filter_word!="")
        {if(!smallname.includes(filter_word.toLowerCase()))
            return true;
            else 
            return false;}
        if(filter_data[0]!="" && !filter_data[0].includes(element.strength))
        {
        return true;
        }
        if(filter_data[1]!="" && !filter_data[1].includes(element.flavor))
        {

            return true;
        }
        if(filter_data[2]!="" && !filter_data[2].includes(element.base))
        {
            return true;
        }
    }

    function generate_catalogue_items()
    {
        catalogue.innerHTML = "";
       //console.log("generated");

        for (const element of cocktails_array)
        {
            if(get_boolean(element))
            continue;
            catalogue.innerHTML+="<div class = \"catalogue_item\"><div class=\"image-box_desktop\">"+
            "<img alt=\"\" class=\"cocktail_img\" src=\""+element.img_path+"\"></div>"+
            "<div>"+
                "<h2 class=\"common-sub-title title desktop\">"+element.name+"</h2>"+
               "<a class = \"cocktail_char\">"+element.strength+", "+element.flavor+", "+ element.base+"</a>"+
                "</div>"+
                "<button class = \"button order_btn\" id = "+element.id+" ><span class=\"fb\">Заказ</span></button>"+
            "</div>";



        }
         catalogue.innerHTML+="<br>";


        for (const element of cocktails_array)
        {
            var current_button = document.getElementById(element.id);
            if(current_button==null)continue;
       // console.log(element.id);

            current_button.onclick= function()
            {id_to_send = element.id;
                order_item.innerHTML="<div class=\"image-box_desktop\"><img alt=\"\" class=\"cocktail_img\" "+"src=\""+element.img_path+"\"></div>"+
            "<div>"+
                "<h2 class=\"common-sub-title title desktop\">"+element.name+"</h2>"+
                "<span class = \"order_desk\">"+element.strength+", "+element.flavor+", "+ element.base+"</span>"+
                "<h3  class = \"order_desk\">"+"Cостав"+"</h3>"+
                "<span class = \"order_desk\">"+parse_components(element.components)+"</span>"+
                "</div>";
                order_internal.innerHTML = element.description;




                closeext();
                order_window.style.display = 'block';
                filter_img.style.display = 'none';
                filter_label.innerHTML = "Подтвердить заказ";
                currentstate=1;
                bool2 = !bool2;
            }
        }
    }
    var search_bool=0;
    generate_catalogue_items();

    search_btn.onclick=function()
    {
        if(search_bool==0)
            {
                 popup.style.display='block';
                search_img.src = "icn/close.svg";
                search_bool=1;
            }
        else 
            {
                search_img.src = "icn/search.svg";
                popup.style.display='none';
                filter_word="";
                search_input.value="";
                search_bool=0;
            }
       
        
    }

  search_input.oninput = function() {
      filter_word=search_input.value;
      generate_catalogue_items();
  }



      var filter_window = document.getElementById("filter_window");

      var back_filter_btn = document.getElementById("reset_filter_btn");
      var user_name = document.getElementById("user_name");
      var order_input = document.getElementById("order_name_input");
      var back_filter_btn = document.getElementById("back_filter_btn");

      var bool1 = false;
      var currentstate=0;
var order_main_label = document.getElementById("order_main_label");
var order_name_input = document.getElementById("order_name_input");

    function parse_components(components)
    {
        var str="";
        for(var i=0; i<components.length;i++)
            {
                str+=components[i][0]+" "+components[i][1]+" мл, "
            }
        str= str.slice(0, -2);
        return str;
    }

    filter_btn.onclick = function()
    {
        if(currentstate==0)//for filter choose
        {
            if(bool1==false)
            {

            closeext();
            filter_window.style.display = 'block';
            filter_img.style.display = 'none';
            filter_label.innerHTML = "Показать результаты";
            }
            else
            {
                generate_catalogue_items();
                filter_window.style.display = 'none';
                filter_label.innerHTML = "Фильтр";
                filter_img.style.display = 'inline-block';
                catalogue.style.display = 'block';

            }
            bool1 = !bool1;
        }
        else//for order
        {
            /*if(order_input.value=="")
            {
                order_main_label.innerHTML="Введите имя (промотайте вниз)";
                order_main_label.style.color = "red";
                user_name.style.color = "red";
                //order_name_input.style.background-color = "red";
                setTimeout(function(){
	                user_name.style.color = "black";
	            },500);
                setTimeout(function(){
	                order_main_label.style.color = "black";
                    order_main_label.innerHTML="Подтверждение заказа";
	            },2000);


	            return;
            }*/
            let cocktail = getById(id_to_send);
            var components = parse_components(cocktail.components);
            item=order_name_input.value+"\nСодержимое: "+cocktail.name+"\n"+components+"\n"+cocktail.recipe;
            tg.sendData(item); 
            //console.log(item);
            order_window.style.display = 'none';
            filter_label.innerHTML = "Фильтр";
            filter_img.style.display = 'inline-block';
            bool2 = !bool2;
            currentstate=0;
             catalogue.style.display = 'block';
        }

    };


    reset_filter_btn.onclick=function()
    {
        reset();
    };


    back_filter_btn.onclick = function()
    {
        if(bool1==false)
        {
            filter_window.style.display = 'block';
            filter_img.style.display = 'none';
            filter_label.innerHTML = "Показать результаты";
        }
        else
        {
            generate_catalogue_items();
            filter_window.style.display = 'none';
            filter_label.innerHTML = "Фильтр";
            filter_img.style.display = 'inline-block';
            catalogue.style.display = 'block';

        }
        bool1 = !bool1;
    };






    var back_order_btn = document.getElementById("back_order_btn");
    back_order_btn.onclick=function()
        {
            generate_catalogue_items();

            order_window.style.display = 'none';
            filter_label.innerHTML = "Фильтр";
            filter_img.style.display = 'inline-block';
            currentstate=0;
            bool2 = !bool2;
            catalogue.style.display = 'block';

        };

