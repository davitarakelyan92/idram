$(document).ready(function() { 
		function padWithZeroes(number, length) {
			var newString = '' + number;
			while (newString.length < length) {
					newString = '0' + newString;
			}

			return newString;
		}

		function makeArrNumbers(str){
			return str.toString().split('');
		}

		function numberShow(number){				
			var padResult = padWithZeroes(number, 9);
			var resultArr = makeArrNumbers(padResult);

			var isStartZero = true;

			$('#counter').empty();

			$.each( resultArr, function( key, value ) {
				var valueType = '';
				if (isStartZero && value === '0') {
					valueType = 'opacityZero';
				}
				else {
					isStartZero = false;
					valueType = 'number';
				}

				$('#counter').append(new NumberImage(value, valueType).createImg());
			});	
			
			var dotImg = new NumberImage('dot', 'dot');
			var amdImg = new NumberImage('amd', 'amd');
			dotImg.createImg().insertAfter($('#counter img:nth-child(3n):not(:last-child)'));
			amdImg.createImg().insertAfter($('#counter img:last-child'));
		}

		function NumberImage(num, type) {
			this.num = num;
			this.type = type;
		}

		NumberImage.prototype.createImg = function(){
			return $(`<img class=${this.type}>`).attr('src', `assets/img/${this.num}.png`);
		}
		
		var showingNumber = 0;
		var step = 1;
		const maxStepCount = 10;
		var stepValue = 0;
		var lastRequestedNumber = 0;	
		function requestData() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: 'https://banking.idram.am/api/misc/Get1DramCount',
					type: 'GET',
					success: function(data) {
						if(data && data.Result){							
							resolve(data.Result.Count)
						}
						else {							
							resolve(showingNumber);
						}
					},
					error: function(err) {
						reject(err)
					}
				});
			});
		}

		function animateNumbers(){
				var rand = Math.floor((Math.random() * 300000) + 100000);
				numberShow(rand);
		}
		
		function calcNumber(){			
			if(step === 1){
				requestData().then(function(requestedNumber) {
					if (lastRequestedNumber === 0){	
						clearInterval(animation);					
						showingNumber = Math.max(Math.round(requestedNumber * 0.8), requestedNumber - 10, showingNumber);						
						stepValue = Math.ceil((requestedNumber - showingNumber) / maxStepCount);
					} else {
						stepValue = Math.ceil((requestedNumber - showingNumber) / (maxStepCount + 1));
						showingNumber += stepValue;
					}

					lastRequestedNumber = requestedNumber;
					numberShow(showingNumber);
				}).catch(function(err) {
					console.log(err)
				})
			} else {
				if (showingNumber + stepValue <= lastRequestedNumber){
					showingNumber += stepValue;
				}

				numberShow(showingNumber);

				if (step !== maxStepCount) {
					step++;
				} else{
					step = 1;
				}
			}
		}

		var animation = setInterval(animateNumbers, 8);
		setInterval(calcNumber, 1000);
		
	});