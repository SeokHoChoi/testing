/**
 * 함수가 호출될 때마다 새로운 객체를 생성
 *
 * @returns 새로운 객체
 */
export const createTestObject = () => {
  return {
    // 기본 데이터 유형
    string: 'Hello, World!',
    number: 42,
    boolean: true,

    // 배열
    array: [1, 2, 3, { nested: 'array' }],

    // 객체
    object: {
      prop1: 'property 1',
      prop2: 123,
      prop3: {
        nestedProp: 'nested property',
      },
    },

    // Map
    map: new Map([
      ['key1', 'value1'],
      ['key2', { nested: 'value2' }],
    ]),

    // Set
    set: new Set([1, 'two', { nested: 'set' }]),
  };
};
