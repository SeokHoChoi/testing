import { createTestObject } from './test-object.js'; // 파일명에 '.js' 입력 필수

/**
 * 주어진 객체가 특정 생성자의 인스턴스인지 확인합니다.
 *
 * @param {Object} instance - 확인할 객체
 * @param {Function} constructor - 생성자 함수
 * @returns {boolean} - 주어진 객체가 생성자의 인스턴스인 경우 true, 그렇지 않은 경우 false 반환
 */
const checkInstance = (instance, constructor) => {
  return instance instanceof constructor;
};

/**
 *  객체의 깊은 복사를 수행하는 범용 함수
 *
 * @param {Object} target - 깊은 복사를 수행할 객체
 * @param {Map} visited - 순환 참조를 방지하기 위한 Map
 * @return {Object} - 깊은 복사가 완료된 객체
 *
 * @description
 * 객체를 복사하기 전에 객체를 조회하여 이미 방문한 적이 있는지 확인합니다.
 * visited 맵에서 객체가 발견되면 해당 깊은 복사된 객체가 즉시 반환되므로
 * 동일한 객체가 여러 번 복사되는 것을 방지할 수 있습니다.
 */
export const deepCopy = (target, visited = new Map()) => {
  if (visited.has(target)) {
    return visited.get(target);
  }

  let copied;

  if (checkInstance(target, Map)) {
    copied = new Map();
    visited.set(target, copied);
    target.forEach((value, key) => {
      const deepCopiedMap = deepCopy(value, visited);
      copied.set(key, deepCopiedMap);
    });
  } else if (checkInstance(target, Set)) {
    copied = new Set();
    visited.set(target, copied);
    target.forEach((value) => {
      const deepCopiedSet = deepCopy(value, visited);
      copied.add(deepCopiedSet);
    });
  } else if (Array.isArray(target)) {
    copied = [];
    visited.set(target, copied);
    target.forEach((element) => {
      const deepCopiedElement = deepCopy(element, visited);
      copied.push(deepCopiedElement);
    });
  } else if (checkInstance(target, Object)) {
    copied = {};
    visited.set(target, copied);
    for (const key in target) {
      copied[key] = deepCopy(target[key], visited);
    }
  } else {
    copied = target;
  }

  return copied;
};

const deepCopyResult = deepCopy(createTestObject());
console.log(createTestObject(), 'test');
console.log(deepCopyResult, 'copied');
deepCopyResult.set.forEach((element) => {
  if (typeof element === 'object' && element !== null && 'nested' in element) {
    console.log((element.nested = 'test'));
  }
});
console.log(createTestObject(), 'test');
console.log(deepCopyResult, 'copied');

/**
 * JSON을 이용하여 깊은 복사를 수행하는 함수
 *
 * @param {Object} target - 깊은 복사를 수행할 객체
 * @returns {Object} - 깊은 복사가 완료된 객체
 *
 * @description
 * 메서드(함수), 숨겨진 프로퍼티인 __proto__, getter/setter등 JSON으로 변경할 수 없는 프로퍼티들은 모두 무시합니다.
 * httpRequest로 받은 데이터를 저장한 객체를 복사할 때 등 순수한 정보만 다룰 때 활용하기 좋은 방법입니다.
 * 그러므로 복사 불가능한 객체인 Map과 Set은 JSON.stringify 및 JSON.parse로 깊은 복사가 어렵습니다.
 * 따라서 이 함수는 Map과 Set에 대해서는 특별한 처리를 하지 않습니다.
 */
const deepCopyUsingJSON = (target) => {
  // 객체를 JSON 문자열로 변환 후 다시 JSON으로 파싱
  return JSON.parse(JSON.stringify(target));
};
const deepCopyResultUsingJSON = deepCopyUsingJSON(createTestObject());
// console.log(createTestObject(), 'test');
// console.log(deepCopyResultUsingJSON, 'copied');

/*
- 함수의 깊은 복사 -

일반적으로 깊은 복사(Deep Copy)의 목적은 데이터를 복사하고 변경하지 않는 것입니다. 
함수는 일반적으로 동적으로 동작하며, 함수를 깊은 복사할 경우 예상치 못한 동작이 발생할 수 있습니다.

JavaScript에서 함수는 클로저(closure)와 같은 개념을 포함하고 있어서, 
함수를 복사하면 클로저의 상태 및 참조 등이 복사되어 의도치 않은 동작을 초래할 수 있습니다. 
또한 함수를 복사하면 해당 함수의 실행 환경이나 참조 등이 복사되지 않기 때문에 
실제 동작에 필요한 컨텍스트가 제대로 유지되지 않을 수 있습니다.

따라서 깊은 복사를 수행하는 함수에는 주로 데이터 객체를 대상으로 하고, 
함수와 같은 동적인 구조는 복사 대상에서 제외하는 것이 일반적입니다. 
이는 데이터의 불변성(Immutability)을 유지하고 예상치 못한 동작을 방지하는 데 도움이 됩니다. 
함수는 일반적으로 코드의 동적인 특성 때문에 깊은 복사의 대상이 아닌 경우가 많습니다.
*/
