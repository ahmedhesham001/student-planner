% task(Name, Difficulty, Deadline, Hours).

calculate_priority(task(_, Diff, Dead, Hours), Priority):-
    Priority is (Diff * 2) + Hours - (Dead * 3).

solve_tasks(Tasks, SortedTasks):-
    add_priorities(Tasks, TasksWithPriority),
    keysort(TasksWithPriority, SortedTasksWithPriority),
    reverse(SortedTasksWithPriority, ReverseSortedTasksWithPriority),
    remove_priorities(ReverseSortedTasksWithPriority, SortedTasks).

add_priorities([],[]).
add_priorities([T|Rest], [P-T|RestP]):-
    calculate_priority(T, P),
    add_priorities(Rest, RestP).

remove_priorities([],[]).
remove_priorities([_-T|RestP], [T|Rest]):-
    remove_priorities(RestP, Rest).

generate_day(Tasks, Schedule) :-
    solve_tasks(Tasks, SortedTasks), 
    fill_slots(8, SortedTasks, Schedule, none, []). 
fill_slots(0, _, [], _, _).

fill_slots(MaxHours, Tasks, [session(Name, SessionDuration)|Next], Prev, Counts) :-
    MaxHours > 0,
    member(task(Name, Diff, Dead, RemainingHours), Tasks),
    RemainingHours > 0,
    Name \= Prev,
    get_count(Name, Counts, C),
    C < 3,
    calculate_session_duration(RemainingHours, MaxHours, SessionDuration),
    
    NewRemainingHours is RemainingHours - SessionDuration,
    update_task_hours(Name, NewRemainingHours, Tasks, NewTasks),
    
    update_count(Name, Counts, NewCounts),
    NewMaxHours is MaxHours - SessionDuration,
    
    fill_slots(NewMaxHours, NewTasks, Next, Name, NewCounts).

update_task_hours(Name, NewHours, [task(Name, D, De, _)|Rest], [task(Name, D, De, NewHours)|Rest]) :- !.
update_task_hours(Name, NewHours, [H|Rest], [H|NewRest]) :- update_task_hours(Name, NewHours, Rest, NewRest).

update_count(Name, [[Name, C]|Rest], [[Name, NC]|Rest]) :- !, NC is C + 1.
update_count(Name, [H|Rest], [H|NewRest]) :- update_count(Name, Rest, NewRest).
update_count(Name, [], [[Name, 1]]).

get_count(Name, [[Name, C]|_], C) :- !.
get_count(Name, [_|Rest], C) :- get_count(Name, Rest, C).
get_count(_, [], 0).

calculate_session_duration(RemainingHours, MaxHours, Duration) :-
    Temp is min(RemainingHours,3),
    Duration is min(Temp,MaxHours).
