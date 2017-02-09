/*
*	
*/
var numberInputLimitDirective = angular.module('numberInputLimitDirective',[]);

// input 数字位数限制--轩--执行一次时间ms级
// number-limit调起指令
// zheng-num='9' 整数位数 必须
// small-num='2' 小数位数 可选
// <input number-limit zheng-num='9' small-num='2' ng-model="num"/>
// 把输入的值转换成字符串处理：以小数点位分开位数组，分别处理
// $scope.$watch情况下 近似认为，每次触发只输入了一位字符
numberInputLimitDirective.directive('numberLimit', ['$timeout',function($timeout) {
	 return {
		restrict:'AE',
		template:'thirective',
		link:function($scope,elm,attr,controller){

			// 判断传入的值是否为数字
			function stringIsNumber(s) {
				var x = +s; // made cast obvious for demonstration
				return x.toString() === s || angular.isNumber(s);
			}

			//去字符串前l位
			function stringLimit(s,l){
				return (s.substring(0,l));
			}

			var zhengNum = attr.zhengNum;
			var smallNum = attr.smallNum ? attr.smallNum : 0;
			// 如果没有placeholder，默认一个
			if (!elm[0].placeholder) {
				elm[0].placeholder = '请输入数字' + (zhengNum ? ('，最大' + zhengNum + '位整数') : '' ) + (smallNum ? (smallNum + '位小数') : '');
			}

			elm[0].onkeyup = function(){
				var newValue = this.value;
				// console.log(newValue);
				if (newValue) {
					if (!newValue || newValue.length == 0) {
						return true;
					}
					// console.log(newValue);
					// console.time("test");
					var stringValue = newValue.toString();
					var array = stringValue.split('.');
					var arrayLen = array.length;
					var result = '';
					if (arrayLen == 1) {
						//木有小数点位
						if(stringIsNumber(array[0])){
							// 是数字
							result = stringLimit(array[0],zhengNum);
						} else {
							// 非数字
							result = '';
						}
					} else if (arrayLen == 2) {
						// 不要求小数位的情况
						if (smallNum == 0) {
							result = array[0];
						} else {
							//有小数点位--array[0]一定是符合要求的整数位
							if ((array[0].length > 0) && (array[1].length == 0)) {
								// 刚输入小数位
								return true;
							} else {
								// 小数位后有字符了
								if ((array[0].length > 0) &&　stringIsNumber(array[1])) {
									result = array[0] + '.' + stringLimit(array[1],smallNum);
								} else {
									result = '';
								}
							}
						}
					} else {
						result = array[0] + '.' + array[1];
					}
					result = Number(result);
					$scope[attr.ngModel] = result;
					this.value = result;
					// console.timeEnd("test");
					return true;
				}
			};
		},
	};
}]);
