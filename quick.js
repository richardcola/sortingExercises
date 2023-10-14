function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

module.exports = { pivot, quickSort };

//the test file for the above is below

const { pivot, quickSort } = require("./quick")

describe('pivot', function () {
  function strLength(a, b) {
    return a.length - b.length
  }

  it('should exist', function () {
    expect(typeof pivot).toBe('function', "did you remember to define the 'pivot' function?");
  });

  it('should return the pivot index', function () {
    var arr1 = [5, 4, 9, 10, 2, 20, 8, 7, 3];
    var arr2 = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16];
    expect(pivot(arr1)).toBe(3, "pivot(arr1) should be 3");
    expect(pivot(arr2)).toBe(4, "pivot(arr2) should be 4");
  });

  it('should mutate the array by placing values on either side of the pivot', function () {
    var arr1 = [5, 4, 9, 10, 2, 20, 8, 7, 3];
    var arr2 = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16];
    pivot(arr1);
    pivot(arr2);

    expect(arr1.slice(0, 3).sort((a, b) => a - b)).toEqual(
      [2, 3, 4],
      "After calling pivot, 2, 3, and 4 should be to the left of 5 in arr1."
    );
    expect(arr1.slice(3).sort((a, b) => a - b)).toEqual(
      [5, 7, 8, 9, 10, 20],
      "After calling pivot, 6, 7, 9, 10, and 20 should be to the right of 5 in arr1."
    );
    expect(arr2.slice(0, 4).sort((a, b) => a - b)).toEqual(
      [0, 2, 4, 5],
      "After calling pivot, 0, 2, 4, and 5 should be to the left of 8 in arr2."
    );
    expect(arr2.slice(4).sort((a, b) => a - b)).toEqual(
      [8, 10, 11, 12, 13, 16],
      "After calling pivot, 10, 11, 12, 13, and 16 should be to the right of 8 in arr2."
    );
  });
});

describe('quicksort', function () {
  it('should exist', function () {
    expect(typeof quickSort).toBe('function', "did you remember to define the 'quickSort' function?");
  });

  it('should sort numbers in ascending order', function () {
    expect(quickSort([4, 20, 12, 10, 7, 9])).toEqual(
      [4, 7, 9, 10, 12, 20],
      "quickSort([4, 20, 12, 10, 7, 9]) should equal [4, 7, 8, 10, 12, 20]"
    );
    expect(quickSort([0, -10, 7, 4])).toEqual(
      [-10, 0, 4, 7],
      "quickSort([0, -10, 7, 4]) should equal [-10, 0, 4, 7]"
    );
    expect(quickSort([1, 2, 3])).toEqual(
      [1, 2, 3],
      "quickSort([1, 2, 3]) should equal [1, 2, 3]"
    );
    expect(quickSort([])).toEqual(
      [],
      "quickSort([]) should be []"
    );
    var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
    expect(quickSort(nums)).toEqual(
      [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342],
      "quickSort([4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32]) should equal [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]"
    );
  });
});
