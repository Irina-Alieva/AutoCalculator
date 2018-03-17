$(document).ready(function(){

	//ВЫбор цвета
	$('.img-selector__items').click(function(){
		var $imgPath=$(this).attr('data-img-path');
		$('#imgHolder img').attr('src',$imgPath);
	});

	//Вычисление стоимости
	
	var modelSpecs = '',
		modelPrice = 0,
		modelSpecsHolder = $('#modelSpecs'),
		modelPriceHolder = $('#modelPrice'),
		modelPriceUSDHolder = $('#modelPriceUSD');

		//При открытии страницы
		calculatePrice();
		choiceSpecifications();
		calculateUSD();

		//При изменении выбора
		$('#autoform input').on('change',function(){
			calculatePrice();
			choiceSpecifications();
			calculateUSD();
		});


		function choiceSpecifications(){
			modelSpecs = $('input[name=engine]:checked + label','#autoform').text(); 
			modelSpecs += ', ' + $('input[name=transmission]:checked + label','#autoform').text();
			modelSpecs += ', ' + $('input[name=suplimentary]:checked + label','#autoform').text();
			modelSpecsHolder.text(modelSpecs);
		}

		function calculatePrice() {
			var modelPriceEngine = $('input[name=engine]:checked','#autoform').val();
			var modelPriceTransmission = $('input[name=transmission]:checked','#autoform').val();
			var modelPriceSuplimentary = $('input[name=suplimentary]:checked','#autoform').val();

				modelPriceEngine = parseInt(modelPriceEngine);
				modelPriceTransmission = parseInt(modelPriceTransmission);
				modelPriceSuplimentary = parseInt(modelPriceSuplimentary);
				modelPrice = modelPriceEngine + modelPriceTransmission + modelPriceSuplimentary;
		}

		// Получаем курс валют
		var currencyUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';
		var rurUsdRate = 0;

		$.ajax({
			url: currencyUrl,
			cache: false,
			success: function(data){
				data=JSON.parse(data);
				console.log(data.Valute.USD.Value);
				rurUsdRate = data.Valute.USD.Value;
				console.log(rurUsdRate);
				calculateUSD();
			} 
		});

		function addSpace(nStr) {
			nStr += ''; 
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ' ' + '$2');
			}
			return x1 + x2;
		}

		function calculateUSD(){
			console.log(modelPrice);
			console.log(rurUsdRate);
			var modelPriceUSD = modelPrice / rurUsdRate;
			console.log(modelPriceUSD);
			// alert(modelPriceUSD);
			modelPriceUSDHolder.text('$' + addSpace(modelPriceUSD.toFixed(0)));
			modelPriceHolder.text(addSpace(modelPrice) + ' рублей' );
		}	

});