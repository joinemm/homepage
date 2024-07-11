---
title: Advent of Code 2023 Day 1
abstract: Trebuchet?!
published: true
date: 2023-12-01
image: day1.jpg
tags: [aoc, programming]
---

It's once again the best time of the year; [Advent of Code](https://adventofcode.com)! In this blog series I will be taking a look at all the puzzles of the year, and how I approached solving them.

For 2023 I chose to solve the puzzles in two languages; Python and Haskell. Python is my favorite language and the one I'm most familiar with, while haskell is a newer addition to my toolbox. In fact, I only started learning it yesterday!

With python I can focus on the puzzle at hand and try different things before landing on a solution that works. I can't exactly do that with haskell as it's more restricted and I have trouble understanding the syntax. So my approach is to then rewrite my python solution in a functional way using haskell.

You can find all of my solutions in my [git repo](https://git.joinemm.dev/advent-of-code/tree/master/2023).

## Day 1: Trebuchet?

Today we are taking a look at [Day 1](https://adventofcode.com/2023/day/1)

Our task is to find the first and last digit from each line of the input, combine these digits to a two-digit number, and sum them up. I approached this quite differently in both languages.

## Python

This was relatively simple to solve, even if I was a little rusty. The last time I have done puzzles like this was last year's advent of code.

### Part 1

```py
def part1(input: str):
    total = 0
    for line in input.split("\n"):
        val = ""
        for i, step in [(0, 1), (len(line) - 1, -1)]:
            while True:
                try:
                    val += str(int(line[i]))
                    break
                except ValueError:
                    i += step

        total += int(val)

    return total
```

So what's happening here? I'm running a while loop that finds the first digit from the string, before breaking and doing that same thing again but backwards (notice the `i` and `step` being the last index of the list and `-1` on the second pass of the for loop). Both digits are collected to a string which is then converted to an int and added to the total.

### Part 2

```py
def part2(input: str):
    num_strings = {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
    }
    total = 0
    for line in input.split("\n"):
        found = set()
        for s, v in num_strings.items():
            for i in [line.find(s), line.rfind(s)]:
                if i > -1:
                    found.add((i, v))

        for i, step in [(0, 1), (len(line) - 1, -1)]:
            while 0 <= i < len(line):
                try:
                    found.add((i, int(line[i])))
                    break
                except ValueError:
                    i += step

        found = sorted(found)
        total += found[0][1] * 10 + found[-1][1]

    return total
```

Part 2 adds a wrench into the mix by introducing digits that are spelled out. I'm reusing my digit finding code from part 1, but saving also the index they were found at, to be used later. For the spelled out numbers, I'm utilizing python's built in `.find()` and `.rfind()` to find the number closest to the start and end of the string, respectively. This process is done for each possible string in `num_strings` to find all the digits. In the end, the set of digits is sorted by the index, and it's first and last element combined to form our final value for the row. As before, these values are summed up to become our final answer.

## Haskell

Ok so this one was not that easy. Haskell's syntax and types threw me off a loop but in the end I came up with a solution that compiles, and even gives me the right answer!

### Part 1

```hs
sum [read [head nums, last nums] :: Int | nums <- [filter isDigit c | c <- lines input ] ]
```

It's a single line! I am very proud of this thing. But what is happening?

- Input is split into lines
- Lines are filtered to only contain digits
- The `head` and `last` of those digits are combined into a string
- The resulting string (`Char` array) is read into an `Int`
- Those `Int`s are summed up to become our answer

### Part 2

Sorry for anyone who actually knows haskell...

```hs
summer' :: String -> Int
summer' line = do
  let nums = filter (>0) [reader' xs | xs <- tailor' line]
  sum [read (show (head nums) ++ show( last nums)) :: Int ]

digiter' :: Char -> Int
digiter' c | isDigit c = read [c] :: Int
           | otherwise = 0

reader' :: String -> Int
reader' s | "one" `isPrefixOf` s = 1
          | "two" `isPrefixOf` s = 2
          | "three" `isPrefixOf` s = 3
          | "four" `isPrefixOf` s = 4
          | "five" `isPrefixOf` s = 5
          | "six" `isPrefixOf` s = 6
          | "seven" `isPrefixOf` s = 7
          | "eight" `isPrefixOf` s = 8
          | "nine" `isPrefixOf` s = 9
          | otherwise = digiter' (head s)

tailor' :: String -> [String]
tailor' []     = []
tailor' (x:xs) = (x:xs) : tailor' xs

part2' :: String -> Int
part2' input = do
  sum [ summer' line | line <- lines input ]
```

The best way I found to solve this without for loops (haskell has no for loops!), was to take a line, create "tails" from it (each element being one head shorter than the last), check if each of those lines starts with a spelled out number or a digit, and transform the tail piece into the corresponding digit, reserving 0 for no digit. I then filter any 0s out of this list of digits, take the first and last elements and combine them into an Int. These numbers for every line are summed up, and there's your answer.
