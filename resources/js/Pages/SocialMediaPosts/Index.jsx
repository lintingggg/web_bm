import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Pencil,
    Plus,
    Trash2,
    XCircle,
    CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const defaultData = {
    platform: 'instagram',
    url: '',
    sort_order: 0,
    is_active: true,
};

function ErrorText({ message }) {
    if (!message) return null;
    return <p className="text-xs text-rose-500">{message}</p>;
}

export default function SocialMediaPostsIndex({ posts }) {
    const [editingItem, setEditingItem] = useState(null);
    const form = useForm(defaultData);

    const submit = (event) => {
        event.preventDefault();

        if (editingItem) {
            form.put(route('social-media-posts.update', editingItem.id), {
                preserveScroll: true,
                onSuccess: () => {
                    form.reset();
                    form.setData(defaultData);
                    setEditingItem(null);
                },
            });
            return;
        }

        form.post(route('social-media-posts.store'), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                form.setData(defaultData);
            },
        });
    };

    const editItem = (item) => {
        setEditingItem(item);
        form.setData({
            platform: item.platform,
            url: item.url,
            sort_order: item.sort_order,
            is_active: item.is_active,
        });
        form.clearErrors();
    };

    const cancelEdit = () => {
        setEditingItem(null);
        form.reset();
        form.setData(defaultData);
        form.clearErrors();
    };

    const deleteItem = async (item) => {
        const result = await Swal.fire({
            title: 'Hapus postingan?',
            text: `Postingan ${item.platform} ini akan dihapus permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#ef4444',
        });

        if (!result.isConfirmed) return;
        router.delete(route('social-media-posts.destroy', item.id), { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Sosial Media Management" />

            <section className="space-y-6">
                <header>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Sosial Media Management</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Kelola URL embed sosial media untuk ditampilkan di halaman beranda.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <section className="surface-card p-5 xl:col-span-1 h-fit">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{editingItem ? 'Edit Postingan' : 'Tambah Postingan'}</h2>
                        <form onSubmit={submit} className="mt-4 space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Platform</label>
                                <select
                                    value={form.data.platform}
                                    onChange={(event) => form.setData('platform', event.target.value)}
                                    className="w-full rounded-[0.625rem] border-slate-300 bg-white text-sm shadow-sm focus:border-primary focus:ring-primary/30 dark:border-border-dark dark:bg-slate-900/30"
                                >
                                    <option value="instagram">Instagram</option>
                                    <option value="tiktok">TikTok</option>
                                    <option value="youtube">YouTube</option>
                                </select>
                                <ErrorText message={form.errors.platform} />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">URL Postingan</label>
                                <input
                                    type="url"
                                    placeholder="Contoh: https://www.instagram.com/p/..."
                                    value={form.data.url}
                                    onChange={(event) => form.setData('url', event.target.value)}
                                    className="w-full rounded-[0.625rem] border-slate-300 bg-white text-sm shadow-sm focus:border-primary focus:ring-primary/30 dark:border-border-dark dark:bg-slate-900/30"
                                />
                                <ErrorText message={form.errors.url} />
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Urutan</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.data.sort_order}
                                        onChange={(event) => form.setData('sort_order', parseInt(event.target.value) || 0)}
                                        className="w-full rounded-[0.625rem] border-slate-300 bg-white text-sm shadow-sm focus:border-primary focus:ring-primary/30 dark:border-border-dark dark:bg-slate-900/30"
                                    />
                                    <ErrorText message={form.errors.sort_order} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Status</label>
                                    <select
                                        value={form.data.is_active ? '1' : '0'}
                                        onChange={(event) => form.setData('is_active', event.target.value === '1')}
                                        className="w-full rounded-[0.625rem] border-slate-300 bg-white text-sm shadow-sm focus:border-primary focus:ring-primary/30 dark:border-border-dark dark:bg-slate-900/30"
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                    <ErrorText message={form.errors.is_active} />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                {editingItem && (
                                    <button type="button" onClick={cancelEdit} className="rounded-[0.625rem] border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-border-dark dark:text-slate-200 dark:hover:bg-slate-800">Batal</button>
                                )}
                                <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-[0.625rem] bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                                    <Plus className="h-4 w-4" />
                                    {editingItem ? 'Perbarui' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="surface-card overflow-hidden xl:col-span-2">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-border-dark">
                                <thead className="bg-slate-50 dark:bg-slate-900/20">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Platform</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">URL</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Urutan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
                                    {posts.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30">
                                            <td className="px-4 py-3">
                                                <span className="capitalize font-semibold text-slate-800 dark:text-slate-200">{item.platform}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <a href={item.url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline line-clamp-1 max-w-[200px]">
                                                    {item.url}
                                                </a>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">{item.sort_order}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.is_active ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                                        <CheckCircle2 className="h-3 w-3" /> Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                                        <XCircle className="h-3 w-3" /> Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => editItem(item)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800">
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button onClick={() => deleteItem(item)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                                Belum ada data postingan sosial media.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
