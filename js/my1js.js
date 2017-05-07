var flagCalc=0;//0 при увімкненні,1 після введення 1 цифри 1 числа
var flagFirstNamber=0;//1стає після дії +,=
var flagFirstNamberStart=0;
var flagSecondNamberStart=0;//1 стає після введення першого символу 2числа
var flagSecondNamber=0;//1стає після дії +,=
var flagResult=0;
var flagIs=0;
var flagPlus=0;
var display=document.querySelector(".display");
var listNumeric=document.querySelectorAll("li[data-value='numeric']");
for(var i=0;i<listNumeric.length;i++){
	listNumeric[i].addEventListener("click",function(){
		if( flagCalc==0 && flagFirstNamber==0){
			display.innerHTML=this.innerHTML;
			flagCalc=1;
			flagFirstNamberStart=1;
		}
		else if( flagCalc==1 && flagFirstNamber==0){
			display.innerHTML=display.innerHTML+this.innerHTML;
			
		}
		else if( flagCalc==1 && flagFirstNamber==1 && flagSecondNamberStart==0){
			display.innerHTML=this.innerHTML;
			flagSecondNamberStart=1;
		}
		else if( flagCalc==1 && flagFirstNamber==1 && flagSecondNamberStart==1){
			display.innerHTML=display.innerHTML+this.innerHTML;
			
		}

		
	});
}

var result=0;
var action="";
var firstNamber="0";
var secondNamber="0";
var firstNamberLength=0;
var secondNamberLength=0;

var plus=document.querySelector("li[data-value='+']");
	plus.addEventListener("click",function(){
		/*+ після 1 числа*/
		if(flagFirstNamber==0 && flagSecondNamber==0 && flagResult==0 && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			flagFirstNamber=1;
			action="+";
		}
		/*+ після 2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="+" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber+secondNamber;
			getCleanVariables();
			action="+";
		}
		/*+ після -2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="-" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber-secondNamber;
			getCleanVariables();
			action="+";
		}
		/*+ після /2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="/" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			if(firstNamber==0 || secondNamber==0){
				result=0;
			}
			else{result=result+firstNamber/secondNamber;}
			getCleanVariables();
			action="+";
		}
		/*+ після *2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="*" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber*secondNamber;
			getCleanVariables();
			action="+";
		}
		/*+ після N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="+" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result+firstNamber;
			getCleanVariables();
			action="+";
		}
		/*+ після -N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="-" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result-firstNamber;
			getCleanVariables();
			action="+";
		}
		/*+ після /N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="/" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			/*Infiniti для ділення*/
			if(firstNamber==0){
				result=0;
			}
			else{result=result/firstNamber;}
			
			getCleanVariables();
			action="+";
		}
		/*+ після /N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="*" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result*firstNamber;
			getCleanVariables();
			action="+";
		}
		/*+ після N числа остання дія =*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="="){
			
			flagFirstNamber=0;
			flagFirstNamberStart=0;
			flagSecondNamberStart=0;
			flagCalc=0;
			firstNamber="0";
			secondNamber="0";
			action="+";
		}

	});
var minus=document.querySelector("li[data-value='-']");
	minus.addEventListener("click",function(){

		
		/*- після 1 числа*/
		if(flagFirstNamber==0 && flagSecondNamber==0 && flagResult==0 && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			flagFirstNamber=1;
			action="-";
		}
		/*- після 2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="-" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber-secondNamber;
			getCleanVariables();
			action="-";
		}
		/*- після +2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="+" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber+secondNamber;
			getCleanVariables();
			action="-";
		}
		/*- після /2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="/" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			if(firstNamber==0 || secondNamber==0){
				result=0;
			}
			else{result=result+firstNamber/secondNamber;}
			
			getCleanVariables();
			action="-";
		}
		/*- після *2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="*" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber*secondNamber;
			getCleanVariables();
			action="-";
		}
		/*- після N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="-" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result-firstNamber;
			getCleanVariables();
			action="-";
		}
		/*- після +N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="+" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result+firstNamber;
			getCleanVariables();
			action="-";
		}
		/*- після /N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="/" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			if(firstNamber==0){
				result=0;
			}
			else{result=result/firstNamber;}
			
			getCleanVariables();
			action="-";
		}
		/*- після *N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="*" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result*firstNamber;
			getCleanVariables();
			action="-";
		}
		/*- після N числа остання дія =*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="="){
			
			flagFirstNamber=0;
			flagFirstNamberStart=0;
			flagSecondNamberStart=0;
			flagCalc=0;
			firstNamber="0";
			secondNamber="0";
			action="-"
		}

	});

/* start for =*/
var valueIs=document.querySelector("li[data-value='=']");
	valueIs.addEventListener("click",function(){
			/*action=="+" */
		if(action=="+" && flagResult==0 && flagFirstNamber==1 && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=result+firstNamber+secondNamber;
			getCleanVariables();
			action="=";
			}
		else if(action=="+" && flagResult==1 && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result+firstNamber;
			getCleanVariables();
			action="=";
			}
			/*action=="-" */
		if(action=="-" && flagResult==0 && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=result+firstNamber-secondNamber;
			getCleanVariables();
			action="=";
			}
		else if(action=="-" && flagResult==1 && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result-firstNamber;
			getCleanVariables();
			action="=";
			}
			/*action=="/" */
		if(action=="/" && flagResult==0 && flagFirstNamber==1 && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			/*Infiniti для ділення*/
			if(firstNamber==0 || secondNamber==0){
				result=0;
			}
			else{result=result+firstNamber/secondNamber;}
			
			getCleanVariables();
			action="=";
			}
		else if(action=="/" && flagResult==1 && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			/*Infiniti для ділення*/
			if(firstNamber==0){
				result=0;
			}
			else{result=result/firstNamber;}
			getCleanVariables();
			action="=";
			}
			/*action=="*" */
		if(action=="*" && flagResult==0 && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=result+firstNamber*secondNamber;
			getCleanVariables();
			action="=";
			}
		else if(action=="*" && flagResult==1 && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result*firstNamber;
			getCleanVariables();
			action="=";
			}
		

		});
	/* end for =*/

	/*ділення start for division*/
var division=document.querySelector("li[data-value='/']");
	division.addEventListener("click",function(){
		/*"/" після 1 числа*/
		if(flagFirstNamber==0 && flagSecondNamber==0 && flagResult==0 && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			flagFirstNamber=1;
			action="/";
		}
		/*"/" після +2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="+" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber+secondNamber;
			getCleanVariables();
			action="/";
		}
		/*"/" після -2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="-" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber-secondNamber;
			getCleanVariables();
			action="/";
		}
		/*"/" після /2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="/" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			/*Infiniti для ділення*/
			if(firstNamber==0 || secondNamber==0){
				result=0;
			}
			else{result=result+firstNamber/secondNamber;}
			//result=firstNamber/secondNamber;
			getCleanVariables();
			action="/";
		}
		/*"/" після *2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="*" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber*secondNamber;
			getCleanVariables();
			action="/";
		}
		/*/ після +N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="+" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result+firstNamber;
			getCleanVariables();
			action="/";
		}
		/*/ після -N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="-" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result-firstNamber;
			getCleanVariables();
			action="/";
		}
		/*/ після /N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="/" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			/*Infiniti для ділення*/
			if(firstNamber==0){
				result=0;
			}
			else{result=result/firstNamber;}
			
			getCleanVariables();
			action="/";
		}
		/*/ після *N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="*" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result*firstNamber;
			getCleanVariables();
			action="/";
		}

		/*/ після N числа остання дія =*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="="){
			
			flagFirstNamber=0;
			flagFirstNamberStart=0;
			flagSecondNamberStart=0;
			flagCalc=0;
			firstNamber="0";
			secondNamber="0";
			action="/";
		}
	});

	/* множення start multiplication*/
var multiplication=document.querySelector("li[data-value='*']");
	multiplication.addEventListener("click",function(){
		/* "*" після 1 числа*/
		if(flagFirstNamber==0 && flagSecondNamber==0 && flagResult==0 && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				console.log(firstNamberLength);
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			flagFirstNamber=1;
			action="*";
		}
		/*"*" після 2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="+" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber+secondNamber;
			getCleanVariables();
			action="*";
		}
		/*"*" після -2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="-" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber-secondNamber;
			getCleanVariables();
			action="*";
		}
		/*"*" після /2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="/" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			/*Infiniti для ділення*/
			if(firstNamber==0 || secondNamber==0){
				result=0;
			}
			else{result=result+firstNamber/secondNamber;}
			
			getCleanVariables();
			action="*";
		}
		/*"*" після *2 числа*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==1 && flagResult==0 && action=="*" && flagSecondNamberStart==1){
			secondNamber=display.innerHTML;
			testIsNegativeSecondNamber();
			if(secondNamber.indexOf(".")>=0){
				secondNamberLength=secondNamber.slice(secondNamber.indexOf(".")+1).length;
				secondNamber=parseFloat(secondNamber);
			}
			else{secondNamber=parseInt(secondNamber);}
			result=firstNamber*secondNamber;
			getCleanVariables();
			action="*";
		}
		/*"*" після N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="+" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result+firstNamber;
			getCleanVariables();
			action="*";
		}
		/*"*" після -N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="-" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result-firstNamber;
			getCleanVariables();
			action="*";
		}
		/*"*" після /N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="/" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			/*Infiniti для ділення*/
			if(firstNamber==0){
				result=0;
			}
			else{result=result/firstNamber;}
			
			getCleanVariables();
			action="*";
		}
		/*"*" після *N числа*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="*" && flagFirstNamberStart==1){
			firstNamber=display.innerHTML;
			testIsNegativeFirstNamber();
			if(firstNamber.indexOf(".")>=0){
				firstNamberLength=firstNamber.slice(firstNamber.indexOf(".")+1).length;
				firstNamber=parseFloat(firstNamber);
			}
			else{firstNamber=parseInt(firstNamber);}
			result=result*firstNamber;
			getCleanVariables();
			action="*";
		}
		/*"*" після N числа остання дія =*/
		else if(flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult==1 && action=="="){
			
			flagFirstNamber=0;
			flagFirstNamberStart=0;
			flagSecondNamberStart=0;
			flagCalc=0;
			firstNamber="0";
			secondNamber="0";
			action="*";
		}

	});

/*point start*/
var point=document.querySelector("li[data-value='.']");
	point.addEventListener("click",function(){
		console.log(flagFirstNamber);
		console.log(flagSecondNamberStart);
		console.log("action "+action);
			if(display.innerHTML.indexOf(".")==-1 && display.innerHTML==0 && action==""){
				display.innerHTML="0.";
				flagCalc=1;
				flagFirstNamberStart=1;
				
			}
			else if(display.innerHTML.indexOf(".")==-1 && display.innerHTML=="-" && action==""){
				display.innerHTML="-0.";
				flagFirstNamberStart=1;
				flagCalc=1;
				
			}
			else if(display.innerHTML.indexOf(".")==-1 && action==""){
				display.innerHTML=display.innerHTML+".";
				flagCalc=1;
				
			}
		
		else if(flagFirstNamber==1 && flagSecondNamberStart==0){
			
				display.innerHTML="0.";
				flagCalc=1;
				flagSecondNamberStart=1;
				
			}
		else if(display.innerHTML=="-" && flagSecondNamberStart==1){
			
				display.innerHTML=display.innerHTML+"0.";
				flagCalc=1;
				
				console.log('3-1');
			}
		else if(display.innerHTML.indexOf(".")==-1 && flagSecondNamberStart==1){
			
				display.innerHTML=display.innerHTML+".";
				flagCalc=1;
				
				console.log('3-1');
			}
		else if(flagFirstNamberStart==0 && flagSecondNamberStart==0 && flagResult==1){
			display.innerHTML="0.";
			flagCalc=1;
			flagFirstNamberStart=1;
		}
		else if(action=="="){
			display.innerHTML="0.";
			flagCalc=1;
			flagFirstNamberStart=1;
		}
		else if(display.innerHTML.indexOf(".")==-1){
			display.innerHTML=display.innerHTML+".";
		}
			

	});
		
		
/*point end*/

var c=document.querySelector("li[data-value='C']");
	c.addEventListener("click",function(){
		flagResult=0;
		result=0;
		flagFirstNamber=0;
		flagSecondNamber=0;
		flagFirstNamberStart=0;
		flagSecondNamberStart=0;
		flagCalc=0;
		firstNamber="0";
		secondNamber="0";
		firstNamberLength=0;
        secondNamberLength=0;
		action=""
		display.innerHTML=0;
	});

var changeSign=document.querySelector("li[data-value='+/-']");
	changeSign.addEventListener("click",function(){
		/*-0 0*/
		if(display.innerHTML.indexOf("-")==-1 && flagFirstNamberStart==0 && flagSecondNamberStart==0 && display.innerHTML==0){
			display.innerHTML="-";
			flagCalc=1;
			flagFirstNamberStart=1;
		}
		else if(display.innerHTML.indexOf("-")!=-1 && flagFirstNamberStart==1 && flagSecondNamberStart==0 && display.innerHTML=="-"){
			display.innerHTML=0;
			flagCalc=0;
			flagFirstNamberStart=0;
		}
		/*start  for first namber with result>0*/
		else if(display.innerHTML.indexOf("-")==-1 && flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult!=0 && action!="="){
			display.innerHTML="-";
			flagCalc=1;
			flagFirstNamberStart=1;
		}
		else if(display.innerHTML.indexOf("-")!=-1 && flagFirstNamber==0 && flagSecondNamberStart==0 && flagResult!=0 && action!="="){
			display.innerHTML="";
			flagCalc=1;
			flagFirstNamberStart=1;
		}
		/*start second namber*/
		else if(flagFirstNamber==1 && flagSecondNamberStart==0){
			display.innerHTML="-";
			flagSecondNamberStart=1;
		}
		/*start for change after =*/
		else if(flagFirstNamber==0 && flagSecondNamber==0 && flagResult!=0 && display.innerHTML.indexOf("-")==-1){
			display.innerHTML="-"+display.innerHTML;
			var variable=display.innerHTML;
			if(variable.indexOf(".")>=0){
				
				variable=parseFloat(variable);
			}
			else{variable=parseInt(variable);}
			result=variable;
		}
		else if(flagFirstNamber==0 && flagSecondNamber==0 && flagResult!=0 && display.innerHTML.indexOf("-")!=-1){
			display.innerHTML=display.innerHTML.slice(1);
			var variable=display.innerHTML;
			if(variable.indexOf(".")>=0){
				
				variable=parseFloat(variable);
			}
			else{variable=parseInt(variable);}
			result=variable;
		}
		/**/
		else if(display.innerHTML.indexOf("-")==-1 && flagFirstNamberStart==1 && flagSecondNamberStart==0){
			display.innerHTML="-"+display.innerHTML;
		}
		else if(display.innerHTML.indexOf("-")==-1 && flagFirstNamberStart==1 && flagSecondNamberStart==1){
			display.innerHTML="-"+display.innerHTML;
		}
		else if(display.innerHTML.indexOf("-")!=-1 && flagFirstNamberStart==1 && flagSecondNamberStart==0){
			display.innerHTML=display.innerHTML.slice(1);
		}
		else if(display.innerHTML.indexOf("-")!=-1 && flagFirstNamberStart==1 && flagSecondNamberStart==1){
			display.innerHTML=display.innerHTML.slice(1);
		}
		
	});

	/*start backspace*/
var backSpace=document.querySelector(".backspase");
	backSpace.addEventListener("click",function(){
		var variable=display.innerHTML;
		if(variable.length>=2 && action!="="){
			variable=display.innerHTML.slice(0,-1);
			display.innerHTML=variable;
		}
		else if(variable.length>=2 && action=="="){
			variable=display.innerHTML.slice(0,-1);
			display.innerHTML=variable;
			if(variable.indexOf(".")>=0){
				
				variable=parseFloat(variable);
			}
			else{variable=parseInt(variable);}
			result=variable;
		}
	});

	/*start memory-plus*/
var memory=0;
var memoryPlus=document.querySelector(".memory-plus");
	memoryPlus.addEventListener("click",function(){
		var variable=display.innerHTML;
		if(variable.indexOf(".")>=0){
				
			variable=parseFloat(variable);
			}
		else{variable=parseInt(variable);}
			memory=memory+variable;
	});

	/*start memory-minus*/
var memoryMinus=document.querySelector(".memory-minus");
	memoryMinus.addEventListener("click",function(){
		var variable=display.innerHTML;
		if(variable.indexOf(".")>=0){
				
			variable=parseFloat(variable);
			}
		else{variable=parseInt(variable);}
			memory=memory-variable;
	});

	/*start memory-output*/
var memoryOutput=document.querySelector(".memory-output");
	memoryOutput.addEventListener("click",function(){
		display.innerHTML=memory;
		result=memory;
		flagFirstNamber=0;
		flagSecondNamberStart=0;
		flagResult=1;
		action="=";
	});

/*start memory-clean*/
var memoryClean=document.querySelector(".memory-clean");
	memoryClean.addEventListener("click",function(){
		memory=0;
	});

function getCleanVariables(){
	if(firstNamberLength>secondNamberLength){
		display.innerHTML=result.toFixed(firstNamberLength);
	}
	else if(firstNamberLength==0 && secondNamberLength==0){
		display.innerHTML=result;
	}
	else{display.innerHTML=result.toFixed(secondNamberLength);}
	
	flagResult=1;
	flagFirstNamber=0;
	flagFirstNamberStart=0;
	flagSecondNamberStart=0;
	firstNamberLength=0;
    secondNamberLength=0;
	flagCalc=0;
	firstNamber="0";
	secondNamber="0";
}
/*sart перевірка чи крім - ще є якісь цифри*/
function testIsNegativeFirstNamber(){
	if(firstNamber.length==1 && firstNamber=="-"){
		firstNamber="0";
	}
}
function testIsNegativeSecondNamber(){
	if(secondNamber.length==1 && secondNamber=="-"){
		secondNamber="0";
	}
}

