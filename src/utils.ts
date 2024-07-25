import { POSITIONS } from "./constants";

export const getPositionFromValue = (value: number) => {
    const maxPos = POSITIONS.length - 1;
    return +((value / maxPos) * 100).toFixed();
  };

export const getValueFromPosition = (position: number) => {
    const maxPos = POSITIONS.length - 1;
    return Math.round((position / 100) * maxPos);
  };

export const quickSort = (arr:number[]): number[] => {
    if (arr.length <= 1) {
      return arr;
    }
  
    const pivot = arr[Math.floor(arr.length / 2)];
  
    const left = [];
    const right = [];
    const equal = [];
  
    for (const element of arr) {
      if (element < pivot) {
        left.push(element);
      } else if (element > pivot) {
        right.push(element);
      } else {
        equal.push(element);
      }
    }
  
    return [...quickSort(left), ...equal, ...quickSort(right)];
  };