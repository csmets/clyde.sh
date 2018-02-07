---
title: JS - Binary Search
draft: false
---

# JavaScript Use Binary Search over Linear Search

## Problem
When working with large arrays, checking to see if it contains a string can be
costly on performance.

# Story (TL;DR)
Whilst learning Java I learned about binary search for `collection` types and
that it's algorithm is a lot more performant than your regular linear search.
Curiously I wanted to see if JavaScript also has binary search natively built
within the language and to my surprise it isn't. The algorithm itself isn't
complex and I recommend myself and others who read this to add it to your
project. Ryan Day has built an NPM module that implements binary search with a
bunch of useful functions
([github repo](https://github.com/soldair/node-binarysearch)). This will solve
the problem with working on large arrays and should be favoured, however there
is an exception if you know your array is going to always be small - you can
ignore doing this.

**Linear Search is faster for small arrays but slow for large ones.**

# Linear Search

Def: Linear; progressing from one stage to another in a single series of steps;
sequential.

Linear Search is probably something you've done quite a lot in JS. To recap by
example:

```
const animals = ["Dog", "Cat", "Bird", "Rabbit", "Tiger", "Whale", "Frog"];

// Linear example 1
for (index in animals) {
  if (let animals[index] === "Tiger") {
    console.log("The Tiger says growl");
  }
}

// Linear example 2
animals.forEach((animal) => {
  if (animal === "Whale") {
    console.log("The Whale makes a large splash");
  }
});

// Linear example 3
if (animals.indexOf("Bird") {
  console.log("The Bird flys high in the sky");
}

// Linear example 4
for (let i = 0; i < animals.length; i++) {
  if (animals[i] === "Rabbit") {
    console.log("Rabbit did a jump of the great wall");
  }
}
```

For all the examples above, each will iterate through the array checking each
item and if there is a match it will print out a log. For large arrays where
there are thousands of records it would have to iterate through each one. What's
interesting is that I've included `indexOf`. This array function does in fact
use linear search. Reading the polyfill on
[MDN
Website](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
proves this claim.

Here is a snippet of it in action:

```
do {
  if (that[index] === member) {
    return index;
  }
} while (++index < length);
```

## Binary Search
Referencing Wikipedia, here is an explanation on the binary search algorithm:

"In computer science, binary search, also known as half-interval search,
logarithmic search, or binary chop, is a search algorithm that finds the
position of a target value within a sorted array. Binary search compares the
target value to the middle element of the array; if they are unequal, the half
in which the target cannot lie is eliminated and the search continues on the
remaining half until it is successful. If the search ends with the remaining
half being empty, the target is not in the array."

Let's take a look how it's been implemented in Java:

_java.util.Arrays version 8u40-b25_
```
2429    private static int binarySearch0(Object[] a, int fromIndex, int toIndex,
2430                                     Object key) {
2431        int low = fromIndex;
2432        int high = toIndex - 1;
2433
2434        while (low <= high) {
2435            int mid = (low + high) >>> 1;
2436            @SuppressWarnings("rawtypes")
2437            Comparable midVal = (Comparable)a[mid];
2438            @SuppressWarnings("unchecked")
2439            int cmp = midVal.compareTo(key);
2440
2441            if (cmp < 0)
2442                low = mid + 1;
2443            else if (cmp > 0)
2444                high = mid - 1;
2445            else
2446                return mid; // key found
2447        }
2448        return -(low + 1);  // key not found.
2449    }
```

Thankfully, doing a binary search isn't a lot of code, but there is an operator
that I am unfamiliar with - bitwise logical operators. On line 2435 you can see
one of those operators getting used, that one in particular is a right bit-shift
operator. I remember learning these in C and got told that you'll most likely
never use it unless you're working with robotics and other low level programming
stuff. So, I threw it out of my brain in space for something else, but after
seeing this in action I think I will have to do some research and write about
these operators in anther post. For now line 2435 is doing something like this:

```
int mid = (low + high) / 2;
```

By looking at the implementation in Java and referencing it against Wikipedia's
explanation makes it easier to read. We can see that it's getting the mid point
of the array and then comparing to see if the mid value matches the key and
determining whether or not to go up or down the chain. It will loop through
again and again getting new mid points, making it's steps quicker than iterating
through one by one. And if the `cmp` is 0 the key is found. Without knowledge of
the `compareTo()` method it is a little hard to understand. The `compareTo()`
method returns the positioning difference between the comparisons from an
ordered list. It will be easier to explain by example.

```
String word1 = "hello";
String word2 = "beatle";
String word3 = "soup";

System.out.println(word1.compareTo(word2)); // 6 because "b" is 6 times greater than "h" in the alphabet
System.out.println(word1.compareTo(word3); // -11 because "s" is 11 times lower than "h"
```

Now that we better understand the binary search method, we can notice an issue.
Since we are comparing via an organised data structure, where everything is
already sorted in order, running this method on an array which is not sorted
will cause issues and not work. Thus, an array must be sorted before use with
binary search.

**Ensure your array is sorted in order before using binary search**

## Javascript implementation
Understanding Java's implementation we can translate it across to JavaScript.

```
function binarySearch(list, key) {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    const midVal = list[mid];
    const cmp = midVal.localeCompare(key);

    if (cmp < 0) {
      low = mid + 1;
    } else if (cmp > 0) {
      high = mid - 1;
    } else {
      return mid; // key found
    }
  }
  return -(low + 1); // key not found.
}
```

A successful return will return the index of the key and if it's unsuccessful it
will return `-1`. Now we can write more efficient code in JS.

NOTE: My JS version is not a performant as the Java method as `localeCompare()`
only returns `-1,0,1` which means it's travel is much shorter than Java's. Since
JS doesn't have a `compareTo` Java-like-method we would have to create our own
to match the same performance.
