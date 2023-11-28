import { createTestObject } from '../test-object';
import { deepCopy } from '../deep-copy';

//     /**
//      * 복사된 객체의 중첩된 객체도 원본과 다른 참조를 가지는지 확인
//      *
//      * has(): 주어진 요소가 존재하는지 그리고 참조가 동일한지 확인, true/false 반환
//      * toBe(): 주어진 값이 예상한 값과 엄격하게 같은지 확인합니다. 즉, .toBe는 === 연산자를 사용하여 엄격한 동등성을 확인
//      * .not: toBe() 결과 반전
//      */

describe('deepCopy function', () => {
  // given
  const originalObject = createTestObject();
  describe('Map을 포함하는 테스트 오브젝트에 대해서', () => {
    // when
    const deepCopyResult = deepCopy(originalObject);
    if (deepCopyResult) {
      describe('깊은 복사가 되었다면', () => {
        // then
        it('복사된 객체를 반환합니다.', () => {
          expect(deepCopyResult.map.get('key2')).not.toBe(
            originalObject.map.get('key2')
          );
        });
      });
    } else {
      describe('깊은 복사가 되지 않았다면', () => {
        it('null을 반환합니다.', () => {
          expect(deepCopyResult).toBeNull();
        });
      });
    }
  });

  describe('Set을 포함하는 테스트 오브젝트에 대해서', () => {
    const deepCopyResult = deepCopy(originalObject);
    if (deepCopyResult) {
      describe('깊은 복사가 되었다면', () => {
        it('복사된 객체를 반환합니다.', () => {
          let isDeepCopy = true;
          originalObject.set.forEach((element) => {
            if (typeof element === 'object' && element !== null) {
              let hasNestedSet = deepCopyResult.set.has(element);
              if (!hasNestedSet) {
                for (let deepCopyElement of deepCopyResult.set) {
                  if (
                    typeof deepCopyElement === 'object' &&
                    deepCopyElement !== null
                  ) {
                    if (
                      JSON.stringify(element) ===
                      JSON.stringify(deepCopyElement)
                    ) {
                      hasNestedSet = true;
                      break;
                    }
                  }
                }
              }
              if (!hasNestedSet) {
                isDeepCopy = false;
              }
            }
          });
          expect(isDeepCopy).toBe(true);
        });
      });
    } else {
      describe('깊은 복사가 되지 않았다면', () => {
        it('null을 반환합니다.', () => {
          expect(deepCopyResult).toBeNull();
        });
      });
    }
  });

  describe('Array를 포함하는 테스트 오브젝트에 대해서', () => {
    const deepCopyResult = deepCopy(originalObject);
    if (deepCopyResult) {
      describe('깊은 복사가 되었다면', () => {
        it('복사된 객체를 반환합니다.', () => {
          expect(deepCopyResult.array[3]).not.toBe(originalObject.array[3]);
        });
      });
    } else {
      describe('깊은 복사가 되지 않았다면', () => {
        it('null을 반환합니다.', () => {
          expect(deepCopyResult).toBeNull();
        });
      });
    }
  });

  describe('다른 경우에 대해서', () => {
    const deepCopyResult = deepCopy(originalObject);
    if (deepCopyResult) {
      describe('깊은 복사가 되었다면', () => {
        it('복사된 객체를 반환합니다.', () => {
          // 프로퍼티 일치확인
          expect(deepCopyResult).toEqual(originalObject);
          // 참조가 동일한지 확인
          expect(deepCopyResult).not.toBe(originalObject);
          expect(deepCopyResult.object.prop3).not.toBe(
            originalObject.object.prop3
          );
        });
      });
    } else {
      describe('깊은 복사가 되지 않았다면', () => {
        it('null을 반환합니다.', () => {
          expect(deepCopyResult).toBeNull();
        });
      });
    }
  });
});
