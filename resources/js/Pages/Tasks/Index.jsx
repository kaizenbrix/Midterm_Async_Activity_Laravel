import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Index({ tasks = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        status: 'pending',
    });

    const [filter, setFilter] = useState('all');

    const visibleTasks = useMemo(() => {
        if (filter === 'all') return tasks;
        return tasks.filter((task) => task.status === filter);
    }, [tasks, filter]);

    function submit(e) {
        e.preventDefault();
        post('/tasks', {
            onSuccess: () => reset(),
        });
    }

    return (
        <>
            <Head title="Task Manager" />

            <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
                <div className="mx-auto max-w-6xl">
                    <header className="mb-8 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Workflow</p>
                            <h1 className="mt-2 text-4xl font-bold">Task Manager</h1>
                        </div>
                        <Link href="/" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50">
                            Refresh
                        </Link>
                    </header>

                    <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
                        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h2 className="text-xl font-semibold">Create task</h2>
                            <form onSubmit={submit} className="mt-5 space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
                                    <input
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Prepare sprint plan"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="4"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Outline tasks, priorities and delivery notes"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
                                >
                                    {processing ? 'Saving...' : 'Add task'}
                                </button>
                            </form>
                        </section>

                        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">Board</h2>
                                    <p className="text-sm text-slate-500">{tasks.length} tasks tracked</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {['all', 'pending', 'in_progress', 'completed'].map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setFilter(status)}
                                            className={[
                                                'rounded-full px-3 py-1.5 text-sm font-medium transition',
                                                filter === status
                                                    ? 'bg-slate-900 text-white'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                                            ].join(' ')}
                                        >
                                            {status === 'all' ? 'All' : status.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {visibleTasks.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                                        No tasks in this category yet.
                                    </div>
                                ) : (
                                    visibleTasks.map((task) => (
                                        <article key={task.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{task.title}</h3>
                                                    {task.description && (
                                                        <p className="mt-1 text-sm text-slate-600">{task.description}</p>
                                                    )}
                                                </div>
                                                <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                                                    {task.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
