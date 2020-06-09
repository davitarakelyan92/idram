$(document).ready(function() { 

		function numberShowMonth(number, monthNumber){

			var newString = '' + number;
			while (newString.length < 7) {
					newString = '0' + newString;
			}
			var str = '';
			var splitted = newString.split('');

			for(var i = 0; i < splitted.length; i++){
				if(i === 1 || i === 4){
					str += '.';
				}
				str += splitted[i];
			}

			number = str;

			if(new Date().getMonth() + 1 === monthNumber){
				$('[data-month-number = ' + monthNumber + ']').parent().parent().addClass('active');
			}
			
			$('[data-month-number = ' + monthNumber + ']').append(number);
				
		}
		
		var showingNumber = 0;
		var step = 1;
		const maxStepCount = 10;
		var stepValue = 0;
		var lastRequestedNumber = 0;	
		function requestData() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: 'https://banking.idram.am/api/misc/Get1DramYearlyCount',
					type: 'GET',
					success: function(data) {
						if(data && data.Result && data.Result.length > 0){
							var startMonth = 6;
							var endMonth = 12;
							var year = 2020;
							var resultArray = [];
							var j = 0;
							for (let i = 0; i < data.Result.length; i++){
								//console.log(data.Result[i].Month);
								if (data.Result[i].Year === year && data.Result[i].Month >= startMonth && data.Result[i].Month <= endMonth){
									resultArray[j] = data.Result[i];
									j++;
								}
							}

							resolve(resultArray);
						}
						else {
							resolve(0);
						}
					},
					error: function(err) {
						reject(err)
					}
				});
			});
		}
		
		function calcNumber(){

			requestData().then(function(requestedNumbers) {
				$('.month-counters').empty();
				$('.month').removeClass('active');
				$.each( requestedNumbers, function( key, value ) {
					numberShowMonth(value.Count, value.Month);
				})
			}).catch(function(err) {
				console.log(err)
			});
		}

		calcNumber();
		setInterval(calcNumber, 3600000); 
		
	});