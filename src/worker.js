//import Worker from 'workerpool';
import PriorityQueue from 'priorityqueuejs';

export function getNextStates(now, disks) {
  let occupied = [false, false, false];
  let result = [];
  let past = 0, offset = 1;
  for (let i = 0; i < disks; i++) {
    const p = now % 3;
    now = Math.floor(now / 3);
    if (!occupied[p]) {
      occupied[p] = true;
      for (let j = 0; j < 3; j++) {
        if (!occupied[j]) result.push((now * 3 + j) * offset + past);
      }
    }
    past += offset * p;
    offset *= 3;
  }
  return result;
}

export function search(disks, h, start = 0, end = Math.pow(3, disks) - 1) {
  const since = performance.now();
  let q = new PriorityQueue((x, y) => y.c - x.c);
  const root = {g: 0, c: h(start), state: start, prev: null};
  let visited = [];
  q.enq(root);
  let now = null;
  while (!q.isEmpty()) {
    const s = q.deq();
    visited.push(s);
    if (s.state === end) {
      now = s;
      break;
    }
    for (let next of getNextStates(s.state, disks)) {
      const child = {g: s.g + 1, c: s.g + 1 + h(next), state: next, prev: s};
      q.enq(child);
    }
  }
  let result = [end];
  while (now.prev != null) {
    result.push(now.prev.state);
    now = now.prev;
  }
  for (let visit of visited) delete visit.prev;
  return {
    moves: result.length - 1,
    steps: visited.length,
    time: performance.now() - since,
    history: result.reverse(),
    visited: visited,
  };
}

export function h(disks, start = 0, end = Math.pow(3, disks) - 1) {
  let dp = new Array(Math.pow(3, disks));
  dp.fill(-1);
  dp[start] = 0;
  let q = [start];
  while (q.length > 0) {
    const s = q.shift();
    for (let next of getNextStates(s, disks)) {
      if (dp[next] !== -1) continue;
      dp[next] = dp[s] + 1;
      q.push(next);
    }
  }
  return s => dp[end] - dp[s];
}

export function solveDP(disks, start = 0, end = Math.pow(3, disks) - 1) {
  const since = performance.now();
  let dp = new Array(Math.pow(3, disks));
  let prev = new Array(Math.pow(3, disks));
  dp.fill(-1);
  dp[start] = 0;
  let q = [start];
  while (q.length > 0) {
    const s = q.shift();
    for (let next of getNextStates(s, disks)) {
      if (dp[next] !== -1) continue;
      dp[next] = dp[s] + 1;
      prev[next] = s;
      q.push(next);
    }
  }
  let result = [end];
  let now = end;
  while (now !== start) {
    result.push(prev[now]);
    now = prev[now];
  }
  return {
    moves: result.length - 1,
    steps: dp.length,
    time: performance.now() - since,
    history: result.reverse(),
  };
}


/*Worker.worker({
  solveDP: solveDP,
  test: test,
});*/
